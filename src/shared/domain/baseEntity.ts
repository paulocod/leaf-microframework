import { createUniqueEntityId, type UniqueEntityId } from "./uniqueId";

const isEntity = <T>(v: unknown): v is Entity<T> => {
	return v instanceof Entity;
};

export abstract class Entity<T> {
	protected readonly _id: UniqueEntityId;
	public readonly props: T;

	constructor(props: T, id?: UniqueEntityId) {
		this._id = id ?? createUniqueEntityId();
		this.props = props;
	}

	public equals(object?: Entity<T>): boolean {
		if (object === this) {
			return true;
		}

		if (!isEntity(object)) {
			return false;
		}

		return this._id.equals(object._id);
	}
}
