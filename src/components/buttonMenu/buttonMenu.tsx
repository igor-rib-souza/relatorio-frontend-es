import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";
import styles from "./page.module.css";
import { Users, Newspaper, Tag, LogOut } from "lucide-react";

export default function ButtonMenu(props: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }){
    return(
            <div>
                <button className={styles.button}>
                    {
                        props.text == "Relatórios" ? <Newspaper className={styles.ButtonMenu}/>
                        :
                        props.text == "Membros" ? <Users className={styles.ButtonMenu}/>
                        :
                        props.text == "Tags" ? <Tag className={styles.ButtonMenu}/>
                        :
                        props.text == "Sair" ? <LogOut className={styles.ButtonMenu}/>
                        :
                        <></>
                    }
                    <p className={styles.text}>{props.text}</p>
                </button>
           </div>
    )
}