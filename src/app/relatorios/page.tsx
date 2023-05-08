import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import Footer from "../../components/footer/footer";
import styles from "./page.module.css";

export default function Relatorios(){
    return(
        <div className={styles.container}>
            <Header/>
            <div className={styles.container2}>
                <div>
                    <Menu/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}