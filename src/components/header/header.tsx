"use client";
import styles from "./page.module.css"
import Logo from "../../../public/assets/Logo.png"
import LogoMinimalista from "../../../public/assets/logo-minimalista.png"
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg"
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from  'js-cookie';
import { useRouter } from "next/navigation";


export default function Header(){

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    
    let menu = document.getElementById("menu");
    
    function toggleMenu(){
        menu!.classList.toggle(styles.openMenu);
    }

    useEffect(() => {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
        handleResize(); // Call once to set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    const router = useRouter();
    const mockUser = {
        "user": {
            "_id": "",
            "name": "",
            "email": "",
            "type": "",
            "createdAt": "",
            "updatedAt": "",
            "__v": null
        },
        "token": ""
    }

    function logout(){
        Cookies.set("user",JSON.stringify(mockUser))
        router.replace('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Image src={windowSize.width>700? Logo : LogoMinimalista} alt={""} className={windowSize.width > 500? styles.Logo : styles.LogoMinimalista}/>
                <div className={styles.searchContainer}>
                    <form className={styles.formContainer}>
                        <input className={styles.inputContainer} placeholder="Buscar Tags..."></input>
                    </form>
                    <Search className={styles.iconContainer} size={20}/>
                </div>
                <Image src={Ausente} alt={""} className={styles.profilePic} onClick={()=> toggleMenu()}/>
                <div className={styles.subMenuWrap} id="menu">
                    <div className={styles.subMenu}>
                        <p>Editar Perfil</p>
                        <p>Exibir analytics de Relatórios</p>
                        <p>Meus Relatórios</p>
                        <hr />
                        <p onClick={()=> logout()}>Sair</p>
                    </div>
                </div>
            </div>
        </div>
    )
}