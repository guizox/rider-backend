import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, RideModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
