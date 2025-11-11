export interface TodoCreate {
	text: string;
	completed?: boolean;
}

export interface TodoOut {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoUpdate {
	text?: string | null;
	completed?: boolean | null;
}
