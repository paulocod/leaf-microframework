import type { UserRepository } from "../domain/userRepository";
import { User } from "../domain/user";

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getUserById(id: string): Promise<User | null> {
		return this.userRepository.findById(id);
	}

	async createUser(id: string, name: string, email: string): Promise<void> {
		const user = new User(id, name, email);
		await this.userRepository.save(user);
	}
}
