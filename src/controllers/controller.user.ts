import { Request, Response } from "express";
import { UserService } from "../services/service.user";
import asyncHandler from "express-async-handler";

export class UserController {
  static getUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query;
    const result = await UserService.getUsers(
      Number(page),
      Number(limit),
      search ? String(search) : undefined
    );
    res.json(result);
  });

  static getUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  });

  static  updateUser = asyncHandler( async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  })

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  })

    static createUser = asyncHandler(async (req: Request, res: Response) => {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    });
}
