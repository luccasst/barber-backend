import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { BarberService } from 'src/barber/barber.service';
import { Barber } from 'src/database/entities/barber.entity';
import { ServicesBarber } from 'src/database/entities/services.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly barberService: BarberService,
  ) {}

  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @Post('services')
  async createService(
    @Request() req: AuthRequest,
    @Body() serviceData: Partial<ServicesBarber>,
  ) {
    const createdService = await this.barberService.createService(
      req.user.id,
      serviceData,
    );
    return createdService;
  }

  @Get('services/:barberId')
  async getService(@Param('barberId') barberId: string) {
    const services = await this.barberService.getServicesBarber(barberId);
    return services;
  }

  @Get('services')
  async getServices(@CurrentUser() user: Barber) {
    const services = await this.barberService.getServicesBarber(user.id);
    return services;
  }

  @Patch('services/:serviceId')
  async updateService(
    @CurrentUser() user: Barber,
    @Param('serviceId') serviceId: string,
    @Body() updateData: Partial<ServicesBarber>,
  ) {
    const updatedService = await this.barberService.updateService(
      user.id,
      serviceId,
      updateData,
    );
    return updatedService;
  }

  @Delete('services/:serviceId')
  async deleteService(
    @CurrentUser() user: Barber,
    @Param('serviceId') serviceId: string,
  ) {
    await this.barberService.deleteService(user.id, serviceId);
    return { message: 'Service deleted successfully' };
  }
}
