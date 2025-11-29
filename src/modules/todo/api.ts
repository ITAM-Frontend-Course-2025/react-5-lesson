import { apiInstance } from "../../shared/api/api-instance";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "./model";

const base = "/api/todos";

export const todosApi = {
  getAll: () => apiInstance.get<Todo[]>(base),

  getById: (id: number) => apiInstance.get<Todo>(`${base}/${id}`),

  create: (dto: CreateTodoDto) => apiInstance.post<Todo, CreateTodoDto>(base, { body: dto }),

  update: (id: number, dto: UpdateTodoDto) =>
    apiInstance.patch<Todo, UpdateTodoDto>(`${base}/${id}`, { body: dto }),

  remove: (id: number) => apiInstance.delete<void>(`${base}/${id}`),
};