export enum Role {
	CLIENT = "CLIENT",
	SUPPORT = "SUPPORT",
	ADMIN = "ADMIN"
}

export interface User {
	id: number,
	name: string,
	email: string,
	password: string,
	role: string
}