import axios from "axios"
import { Base_Url } from "../../shared/config/constants";

export const TodosApi = {
    getAll: () => 
        axios.get(`${Base_Url}/todos`).then((resp) => resp.data),
    getById: (id:number) => 
        axios.get(`${Base_Url}/${id}`).then((resp) => resp.data),
    postNew: (todoData: {text:string, completed: boolean}) =>
        axios.post(`${Base_Url}/todos`, todoData ).then((resp) => resp.data),
    delete: (id: number) => 
        axios.delete(`${Base_Url}/todos/${id}`).then((resp) => resp.data)
}
