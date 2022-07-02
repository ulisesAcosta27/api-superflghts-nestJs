import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { PassengerService } from "./passenger.service";
import { PassengerDTO } from "./dto/passenger.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/v1/passenger")
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  getAll() {
    return this.passengerService.getAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id)
  }

  @Put(':id') 
  update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id)
  }
}
