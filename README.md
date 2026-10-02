# Shipment Service Testing Practice

Proyecto NestJS sencillo para practicar pruebas unitarias de servicios con un repository de TypeORM simulado.

## Preparación

```bash
npm install
```

## Objetivo

Crea `src/shipments/shipments.service.spec.ts` y desarrolla los seis casos indicados en el enunciado del taller.

```bash
npm test
```

Las pruebas unitarias no requieren Docker ni PostgreSQL. La configuración de base de datos se incluye únicamente para permitir ejecutar la API de forma opcional.

## Archivos que no deben modificarse

- `src/shipments/shipments.service.ts`
- `src/shipments/shipment-rules.service.ts`
- `src/shipments/entities/shipment.entity.ts`
- `src/shipments/dto/create-shipment.dto.ts`

El trabajo debe concentrarse en el archivo de pruebas.
