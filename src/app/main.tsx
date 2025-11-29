import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Не удалось найти контейнер для приложения.");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

