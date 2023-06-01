"use client";
import styles from "./page.module.css"
import Logo from "../../../public/assets/Logo.png"
import LogoMinimalista from "../../../public/assets/logo-minimalista.png"
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg"
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


export default function Header() {

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const profilePic = user.user.profilePic.url;

    let menu = document.getElementById("menu");

    function toggleMenu() {
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
            "profilePic": {
                "url": null,
                "key": null
            },
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

    const modalProfileSettings = document.getElementById("modalProfileSettings")

    function profileSettings() {
        modalProfileSettings!.showModal();
    }

    function logout() {
        Cookies.set("user", JSON.stringify(mockUser))
        router.replace('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Image src={windowSize.width > 700 ? Logo : LogoMinimalista} alt={""} className={windowSize.width > 500 ? styles.Logo : styles.LogoMinimalista} />
                <div className={styles.searchContainer}>
                    <form className={styles.formContainer}>
                        <input className={styles.inputContainer} placeholder="Buscar Tags..."></input>
                    </form>
                    <Search className={styles.iconContainer} size={20} />
                </div>
                <Image src={profilePic != null ? profilePic : Ausente} alt={"Profile picture"} className={styles.profilePic} onClick={() => toggleMenu()} width={100} height={100}/>
                <div className={styles.subMenuWrap} id="menu">
                    <div className={styles.subMenu}>
                        <p onClick={() => profileSettings()}>Editar Perfil</p>
                        <p>Exibir analytics de Relatórios</p>
                        <p>Meus Relatórios</p>
                        <hr />
                        <p onClick={() => logout()}>Sair</p>
                    </div>
                </div>
                <dialog id="modalProfileSettings" className={styles.modalProfileSettings}>
                    <h1>Atualizar foto</h1>
                    <p>Função</p>
                    <p>Nome</p>
                    <button className={styles.button}>Atualizar</button>
                </dialog>
            </div>
        </div>
    )
}