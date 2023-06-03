import styles from "./page.module.css"
import ButtonMenu from "../buttonMenu/buttonMenu"

export default function Menu(){
    return(
        <div className={styles.container}>
           <ButtonMenu text={"Relatórios"}/>
           <ButtonMenu text={"Membros"}/>
           <ButtonMenu text={"Tags"}/>
           <ButtonMenu text={"Sair"}/>
        </div>
    )
}