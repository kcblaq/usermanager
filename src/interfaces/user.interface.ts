export interface IUser extends Document {
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }