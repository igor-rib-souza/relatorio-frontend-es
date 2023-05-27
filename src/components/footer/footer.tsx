"use client"
import styles from "./page.module.css";
import { Calendar, Send } from "lucide-react";
import Cookies from "js-cookie";
import api from "@/services/api";

export default function Footer() {

    const cookies: string = Cookies.get("user");
    const user = JSON.parse(cookies)


    async function sendReport() {

        await api.post(`/report/${user.user._id}`, {
            user:user.user._id,
            date:  "2021/03/01",
            startTime: "00:00",
            endTime: "11:00",
            text:"testando",
            tags:["chatuba"]
        }, 
        {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }
        ).then((response) => console.log(response)
        ).catch((error) => console.log(error.response.data))
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <form className={styles.formContainer}>
                    <input className={styles.inputContainer} placeholder="Relatório"></input>
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