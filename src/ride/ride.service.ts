import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideRepository } from './ride.repository';

@Injectable()
export class RideService {
  constructor(private rideRepository: RideRepository) { }

  async create(createRideDto: CreateRideDto, user: User) {
    return await this.rideRepository.createRide(createRideDto, user);
  }

  async findAll(user: User) {
    return await this.rideRepository.find({ where: { userId: user.id } });
  }

  async findOne(id: number, user: User) {
    const ride = await this.rideRepository.findOne({
      where: { id: id, userId: user.id },
    });

    if (!ride) {
      throw new NotFoundException('Not found');
    }

    return ride;
  }

  async remove(id: number, user: User) {
    const ride = await this.findOne(id, user);

    return await this.rideRepository.delete({ id: ride.id });
  }
}
