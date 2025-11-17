import axios from "axios"
import { Base_Url } from "../../shared/config/constants";

export const TodosApi = {
    // Получение массива todos 
    getAll: () => 
        axios.get(`${Base_Url}/todos`).then((resp) => {
            const allTodos = resp.data;
            return allTodos
        }),

    // Получение todo по ID 
    getById: (id:number) => 
        axios.get(`${Base_Url}/${id}`).then((resp) => {
            const todoById = resp.data;
            return todoById
        }),
    postNew: (todoData: {text:string, completed: boolean}) =>
        axios.post(`${Base_Url}/todos`, todoData ).then((resp) => {
            const newTodo = resp.data
            return newTodo
        })
}