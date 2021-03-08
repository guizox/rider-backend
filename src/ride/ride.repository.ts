import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';

@EntityRepository(Ride)
export class RideRepository extends Repository<Ride> {
  async createRide(createRideDTO: CreateRideDto, user: User): Promise<Ride> {
    const { amount, category, description } = createRideDTO;

    const ride = new Ride();
    ride.amount = amount;
    ride.category = category;
    ride.description = description;

    console.log(user);
    ride.userId = user.id;
    try {
      await ride.save();
    } catch (e) {
      console.log(e);
      console.log('error');
    }

    return ride;
  }
}
