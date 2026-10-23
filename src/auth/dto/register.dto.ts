import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(200)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9\s-_]+$/, {
    message: 'El campo solo puede contener letras, números, espacios y guiones',
  })
  password!: string;
}
