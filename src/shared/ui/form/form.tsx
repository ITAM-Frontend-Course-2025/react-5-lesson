import { useState } from "react";
import axios from "axios";
import styles from "./form.module.css";

type FormProps = {
    id?: string;
    formType: "create" | "edit";
};

export const Form = ({formType, id} : FormProps) => {
    const [text, setText] = useState<string>("");

    const handleSubmit = () => {
        if (formType === "create") {
            axios.post(`${import.meta.env.VITE_API_URL}/todos`, {text: text, completed: false})
            .then(response => {
                console.log("Successful todo creation!");
                console.log(response);
            })
            .catch(error => {
                console.error("Todo creation error: ", error)
            });
        } else {
            axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {text: text})
            .then(response => {
                console.log("Successful editing!");
                console.log(response);
            })
            .catch(error => {
                console.error("Editing error: ", error)
            });
        }
    };

    return (
        <form className={styles.form}>
            <h4 className={styles.heading}>{formType === "create" ? "Cоздать" : "Изменить"} задачу</h4>
            <input
                className={styles.textInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
                placeholder="Введите описание задачи"
            />
            <button
                className={`${styles.buttonSubmit} ${formType === "create" ? styles.create : styles.edit}`}
                onClick={handleSubmit}
                disabled={text.length === 0 ? true : false}
            >
                    {formType === "create" ? "Создать задачу" : "Применить изменения"} 
            </button>
        </form>
    );
};