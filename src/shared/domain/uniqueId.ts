import { v4 as uuidv4 } from "uuid";
import { Identifier } from "./identifier";

export function createUniqueEntityId(id?: string | number): UniqueEntityId {
	return new UniqueEntityId(id ?? uuidv4());
}

export class UniqueEntityId extends Identifier<string | number> {}
