import { Property } from 'src/entities/property.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:npg_j0mrNWD5yYnw@ep-empty-breeze-a5tko7jk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  type: 'postgres',
  port: 3306,
//   entities: [Property],
  entities: [__dirname+'/../**/*.entity.{ts,js}'],
  synchronize: true,
};
