import styles from "./page.module.css";
import { Calendar, Send} from "lucide-react";

export default function Footer(){
    return(
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                    <form className={styles.formContainer}>
                        <input className={styles.inputContainer} placeholder="Relatório"></input>
                    </form>
                </div>
                <div className={styles.iconContainer}>
                        <Calendar className={styles.icon}/>
                        <Send className={styles.icon}/>
                    </div>
        </div>
    )
}