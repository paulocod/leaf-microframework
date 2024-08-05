import { Router } from "express";
import { UserController } from "../http/userController";
import { UserRepositoryImpl } from "../../infrastructure/userRepositoryImpl";
import { UserService } from "../../application/userService";

const userRouter = Router();

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/:id", (req, res) => userController.getUser(req, res));
userRouter.post("/", (req, res) => userController.createUser(req, res));

export { userRouter };
