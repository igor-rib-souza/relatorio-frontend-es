"use client"
import styles from "./page.module.css";
import { Calendar, Send } from "lucide-react";
import Cookies from "js-cookie";
import api from "@/services/api";
import { SetStateAction, useState } from "react";

export default function Footer() {

    const cookies: string = Cookies.get("user");
    const user = JSON.parse(cookies)
    const [text, setText] = useState("");

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setText(event.target.value);
      };


    async function sendReport() {

        await api.post(`/report/${user.user._id}`, {
            user:user.user._id,
            date:  "2021/03/01",
            startTime: "00:00",
            endTime: "11:00",
            text:text,
            tags:["chatuba"]
        }, 
        {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }
        ).then((response) => setText("")
        ).catch((error) => console.log(error.response.data))
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <form className={styles.formContainer}>
                    <input className={styles.inputContainer} placeholder="Relatório" value={text} onChange={handleChange }></input>
                </form>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.iconBackground}>
                    <Calendar className={styles.icon} />
                </div>
                <button className={styles.iconBackground} onClick={() => sendReport()}>
                    <Send className={styles.icon} />
                </button>
            </div>
        </div>
    )
}