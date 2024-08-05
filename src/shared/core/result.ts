export class Result<T> {
	public isSuccess: boolean;
	public isFailure: boolean;
	private readonly _error?: T | string;
	private readonly _value?: T;

	public constructor(isSuccess: boolean, error?: T | string, value?: T) {
		if (isSuccess && error) {
			throw new Error(
				"InvalidOperation: A result cannot be successful and contain an error",
			);
		}

		if (!isSuccess && !error) {
			throw new Error(
				"InvalidOperation: A failing result needs to contain an error message",
			);
		}

		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;
		this._error = error;
		this._value = value;

		Object.freeze(this);
	}

	public getValue(): T {
		if (!this.isSuccess) {
			throw new Error(
				"Can't get the value of an error result. Use 'errorValue' instead.",
			);
		}

		if (this._value === undefined) {
			throw new Error("Value is undefined");
		}
		return this._value;
	}

	public getErrorValue(): string | T {
		if (this._error === undefined) {
			throw new Error("Error value is undefined");
		}
		return this._error as T;
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, undefined, value);
	}

	public static fail<U>(error: string): Result<U> {
		return new Result<U>(false, error);
	}

	public static combine<T>(results: Result<T>[]): Result<void> {
		for (const result of results) {
			if (result.isFailure) {
				return Result.fail(result.getErrorValue() as string);
			}
		}
		return Result.ok();
	}
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
	readonly _value: L;

	constructor(value: L) {
		this._value = value;
	}

	isLeft(): this is Left<L, A> {
		return true;
	}

	isRight(): this is Right<L, A> {
		return false;
	}
}

export class Right<L, A> {
	readonly _value: A;

	constructor(value: A) {
		this._value = value;
	}

	isLeft(): this is Left<L, A> {
		return false;
	}

	isRight(): this is Right<L, A> {
		return true;
	}
}

export const left = <L, A>(l: L): Either<L, A> => {
	return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
	return new Right(a);
};
