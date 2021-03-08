import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('ride')
@UseGuards(AuthGuard())
export class RideController {
  constructor(private readonly rideService: RideService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createRideDto: CreateRideDto, @GetUser() user: User) {
    return this.rideService.create(createRideDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.rideService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.rideService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.rideService.remove(+id, user);
  }
}
