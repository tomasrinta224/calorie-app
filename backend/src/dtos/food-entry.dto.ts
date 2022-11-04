import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
} from "class-validator";

export class CreateFoodEntryDto {
  @IsInt()
  @Min(1)
  userId: number = 0;

  @Length(1, 30)
  foodName: string = "";

  @IsNumber()
  @Min(0)
  @Max(100000)
  calorie: number = 0;

  @IsInt()
  @Min(0)
  @Max(1000000)
  price: number = 0;

  @IsDateString()
  tookAt: string = "";
}

export class UpdateFoodEntryDto {
  @IsNotEmpty()
  @Min(1)
  foodEntryId: number = 0;

  @IsOptional()
  @Length(1, 30)
  foodName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  calorie?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  price?: number;

  @IsOptional()
  @IsDateString()
  tookAt?: string;
}
