import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { QueryFailedError, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
    }); // La contraseña texto plano se vuelve hash
    const user = this.usersRepository.create({ email, passwordHash });

    try {
      const savedUser = await this.usersRepository.save(user);
      return { id: savedUser.id, email: savedUser.email };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matches = await argon2.verify(user.passwordHash, dto.password);
    if (!matches) {
      throw new UnauthorizedException('Invalid password credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: String(user.id),
    });
    return { access_token: accessToken };
  }
}
