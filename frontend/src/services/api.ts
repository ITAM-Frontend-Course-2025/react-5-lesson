import axios from "axios";
import type { TodoCreate, TodoOut, TodoUpdate } from "../types/todo";

// Create axios instance with base URL
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
	headers: {
		"Content-Type": "application/json",
	},
});

// API service functions for CRUD operations
export const todoService = {
	// Create a new todo
	createTodo: async (data: TodoCreate): Promise<TodoOut> => {
		const response = await api.post<TodoOut>("/api/todos", data);
		return response.data;
	},

	// Get all todos
	listTodos: async (skip: number = 0, limit: number = 50): Promise<TodoOut[]> => {
		const response = await api.get<TodoOut[]>("/api/todos", {
			params: { skip, limit },
		});
		return response.data;
	},

	// Get a single todo by ID
	getTodo: async (todoId: number): Promise<TodoOut> => {
		const response = await api.get<TodoOut>(`/api/${todoId}`);
		return response.data;
	},

	// Update a todo
	updateTodo: async (todoId: number, data: TodoUpdate): Promise<TodoOut> => {
		const response = await api.patch<TodoOut>(`/api/todos/${todoId}`, data);
		return response.data;
	},

	// Delete a todo
	deleteTodo: async (todoId: number): Promise<void> => {
		await api.delete(`/api/todos/${todoId}`);
	},

	// Health check
	healthCheck: async (): Promise<void> => {
		await api.get("/health");
	},
};

export default api;
