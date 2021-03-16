import { IsNotEmpty, IsDateString } from 'class-validator';

export class FilterRideDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  category: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
