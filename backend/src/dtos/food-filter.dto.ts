import { IsDateString, IsInt, IsOptional, Min } from "class-validator";

export class FoodFilterDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  userId?: number;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;
}
