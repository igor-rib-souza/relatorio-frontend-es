import styles from "./page.module.css"
import ButtonMenu from "../buttonMenu/buttonMenu"

export default function Menu(){
    return(
        <div className={styles.container}>
           <ButtonMenu text={"Criar novo usuário"}/>
           <ButtonMenu text={"Excluir Usuário"}/>
           <ButtonMenu text={"Exibir detalhes"}/>
        </div>
    )
}