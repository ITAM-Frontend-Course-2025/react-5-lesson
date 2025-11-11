import { Navigate, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/ui/main-layout";
import { TodoDetailsPage } from "../pages/todo-details";
import { TodosPage } from "../pages/todos";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ index: true, element: <Navigate to="/todos" replace /> },
			{ path: "todos", element: <TodosPage /> },
			{ path: "todos/:id", element: <TodoDetailsPage /> },
			{ path: "*", element: <Navigate to="/todos" replace /> },
		],
	},
]);

