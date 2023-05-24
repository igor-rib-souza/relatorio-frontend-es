"use client"
import styles from "./page.module.css";
import { Calendar, Send } from "lucide-react";
import Cookies from "js-cookie";

export default function Footer() {

    const cookies = Cookies.get("user");

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
                <button className={styles.iconBackground} onClick={() => alert(cookies)}>
                    <Send className={styles.icon} />
                </button>
            </div>
        </div>
    )
}