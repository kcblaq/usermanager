import UserModel from "../model/user.model";
import { IUser } from "../interfaces/user.interface";
import { PaginatedResponse } from "../interfaces/pagination.interface";

export class UserService {
    private readonly userModel: typeof UserModel;
    constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

       
        static async getUsers(
            page: number = 1,
            limit: number = 10,
            search?: string
          ): Promise<PaginatedResponse<IUser>> {
            const query = search
              ? {
                  $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                  ],
                }
              : {};
        
            const [users, total] = await Promise.all([
              UserModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit),
              UserModel.countDocuments(query),
            ]);
        
            return {
              data: users,
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit),
            };
          }

          static async getUser(id: string): Promise<IUser | null> {
            return await UserModel.findById(id);
          }
          
          static async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
                return UserModel.findByIdAndUpdate(id, data,{ new: true });
          }

          static async deleteUser(id: string) : Promise<IUser | null> {
            return UserModel.findByIdAndDelete(id);
          }
            static async createUser(data: IUser): Promise<IUser> {
            const newUser = new UserModel(data);
            return await newUser.save();
                
            }
}

export default new UserService(UserModel);