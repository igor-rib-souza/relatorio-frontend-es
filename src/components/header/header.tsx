import styles from "./page.module.css"
import Logo from "../../../public/assets/Logo.png"
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg"
import Image from 'next/image';
import { Search } from 'lucide-react';


export default function Header(){
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Image src={Logo} alt={""} className={styles.Logo}/>
                <div className={styles.searchContainer}>
                    <form className={styles.formContainer}>
                        <input className={styles.inputContainer} placeholder="Buscar Tags..."></input>
                    </form>
                    <Search className={styles.iconContainer} size={25}/>
                </div>
                <Image src={Ausente} alt={""} className={styles.profilePic}/>
            </div>
        </div>
    )
}