import type { Request, Response } from "express";
import type { UserService } from "../../application/userService";

export class UserController {
	constructor(private userService: UserService) {}

	async getUser(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const user = await this.userService.getUserById(id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).send("User not found");
		}
	}

	async createUser(req: Request, res: Response): Promise<void> {
		const { id, name, email } = req.body;
		await this.userService.createUser(id, name, email);
		res.status(201).send("User created");
	}
}
