import Header from "../../components/header/header"
import Menu from "../../components/menu/menu"
import styles from "./page.module.css"

export default function Relatorios(){
    return(
        <div className={styles.container}>
            <Header/>
            <Menu/>
        </div>
    )
}