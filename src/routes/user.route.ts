import { Router } from 'express';

import { validate } from '../middleware/uservalidation.middleware';
import { userSchema } from '../validation/validation.user';
import { UserController } from '../controllers/controller.user';

const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUser);
userRouter.post("/", validate(userSchema), UserController.createUser);
userRouter.put("/:id", validate(userSchema), UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;