export type Todo = {
	id: number;
	text: string;
	description?: string | null;
	completed: boolean;
};

export type CreateTodoDto = {
  text: string;
  description?: string | null;
};

export type UpdateTodoDto = Partial<{
  text: string;
  description: string | null;
  completed: boolean;
}>;
