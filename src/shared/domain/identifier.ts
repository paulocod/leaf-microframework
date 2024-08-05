export class Identifier<T> {
	constructor(private readonly value: T) {}

	public equals(id?: Identifier<T>): boolean {
		if (id === null || id === undefined) {
			return false;
		}

		if (!(id instanceof Identifier)) {
			return false;
		}

		return this.value === id.value;
	}

	public toString(): string {
		return String(this.value);
	}

	public toValue(): T {
		return this.value;
	}
}
