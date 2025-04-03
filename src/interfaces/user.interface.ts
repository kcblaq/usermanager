export interface IUser extends Document {
  name: string;
  email: string;
  role?: "admin" | "user";
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}