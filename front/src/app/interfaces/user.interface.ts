export enum Role {
	CLIENT = "CLIENT",
	EMPLOYEE = "EMPLOYEE",
	ADMIN = "ADMIN"
}

export interface User {
	id: number,
	name: string,
	email: string,
	password: string,
	role: Role
}