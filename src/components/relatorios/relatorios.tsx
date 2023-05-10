import styles from "./page.module.css"
import { ArrowRight } from "lucide-react"

export default function Relatorios(){
    return(
            <div className={styles.container}>
                <div className={styles.headerRelatorio}>
                    <div className={styles.containerHeaderData}>
                        <p className={styles.date}>26/05/2022</p>
                        <ArrowRight className={styles.arrow} size={15}/>
                        <p className={styles.date}>27/05/2023</p>
                    </div>
                </div>
                <div className={styles.containerRelatorio}>

                </div>
           </div>
    )
}