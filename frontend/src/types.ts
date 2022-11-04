export interface IFood {
  foodEntryId: string;
  tookAt: string;
  foodName: string;
  calorie: number;
  price: number;
  username: string;
}

export interface IFoodForm {
  foodEntryId: string;
  tookAt: string;
  foodName: string;
  calorie: string;
  price: string;
  username: string;
}

export interface IUserInfo {
  userId: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
}

export interface IWarningDate {
  date: string;
}

export interface IWarningMonth {
  month: string;
}

export interface IReport {
  oneWeekBeforeCount: number;
  twoWeekBeforeCount: number;
  averageCalories: IAverageCalorie[];
}

interface IAverageCalorie {
  dailyAverage: number;
  userId: number;
  username: string;
}
