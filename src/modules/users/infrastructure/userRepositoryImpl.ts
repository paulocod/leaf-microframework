import type { UserRepository } from "../domain/userRepository";
import type { User } from "../domain/user";

export class UserRepositoryImpl implements UserRepository {
	private users: Map<string, User> = new Map();

	async findById(id: string): Promise<User | null> {
		return this.users.get(id) || null;
	}

	async save(user: User): Promise<void> {
		this.users.set(user.id, user);
	}
}
