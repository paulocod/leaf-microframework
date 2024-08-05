import { Result } from "./result";

export type CheckerResponse = string;

export interface ICheckerArgument<T> {
	argument: T;
	argumentName: string;
}

export type CheckerArgumentBulk<T> = ICheckerArgument<T>[];

export function combine(
	checkerResults: Result<CheckerResponse>[],
): Result<CheckerResponse> {
	for (const result of checkerResults) {
		if (result.isFailure) return result;
	}
	return Result.ok<CheckerResponse>();
}

export function greaterThan(
	minValue: number,
	actualValue: number,
): Result<CheckerResponse> {
	return actualValue > minValue
		? Result.ok<CheckerResponse>()
		: Result.fail<CheckerResponse>(
				`Number given {${actualValue}} is not greater than {${minValue}}`,
			);
}

export function againstAtLeast(
	numChars: number,
	text: string,
): Result<CheckerResponse> {
	return text.length >= numChars
		? Result.ok<CheckerResponse>()
		: Result.fail<CheckerResponse>(`Text is not at least ${numChars} chars.`);
}

export function againstAtMost(
	numChars: number,
	text: string,
): Result<CheckerResponse> {
	return text.length <= numChars
		? Result.ok<CheckerResponse>()
		: Result.fail<CheckerResponse>(`Text is greater than ${numChars} chars.`);
}

export function isOneOf<T>(
	value: T,
	validValues: T[],
	argumentName: string,
): Result<CheckerResponse> {
	const isValid = validValues.includes(value);

	if (isValid) {
		return Result.ok<CheckerResponse>();
	}
	return Result.fail<CheckerResponse>(
		`isn't one of the correct types in ${JSON.stringify(validValues)}. Got "${value}".`,
	);
}

export function inRange(
	num: number,
	min: number,
	max: number,
	argumentName: string,
): Result<CheckerResponse> {
	const isInRange = num >= min && num <= max;
	if (!isInRange) {
		return Result.fail<CheckerResponse>(
			`${argumentName} is not within range ${min} to ${max}.`,
		);
	}
	return Result.ok<CheckerResponse>();
}

export function allInRange(
	numbers: number[],
	min: number,
	max: number,
	argumentName: string,
): Result<CheckerResponse> {
	let failing: Result<CheckerResponse> | null = null;

	for (const num of numbers) {
		const numInRange = inRange(num, min, max, argumentName);
		if (!numInRange.isFailure) {
			failing = numInRange;
			break;
		}
	}

	if (failing) {
		return Result.fail<CheckerResponse>(
			`${argumentName} is not within the range.`,
		);
	}
	return Result.ok<CheckerResponse>();
}
