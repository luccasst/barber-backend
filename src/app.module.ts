import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { UserMethodsController } from './user/user-methods.controller';
import { UserClientModule } from './user-client/user-client.module';
// import { RolesGuard } from './auth/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    UserClientModule,
  ],
  controllers: [AppController, UserMethodsController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; 

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52
})
export class AppModule {}
