"use client";
import styles from "./page.module.css"
import Logo from "../../../public/assets/Logo.png"
import LogoMinimalista from "../../../public/assets/logo-minimalista.png"
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg"
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';


export default function Header(){

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(()=>{
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Image src={windowSize.width>309? Logo : LogoMinimalista} alt={""} className={windowSize.width > 309? styles.Logo : styles.LogoMinimalista}/>
                <div className={styles.searchContainer}>
                    <form className={styles.formContainer}>
                        <input className={styles.inputContainer} placeholder="Buscar Tags..."></input>
                    </form>
                    <Search className={styles.iconContainer}/>
                </div>
                <Image src={Ausente} alt={""} className={styles.profilePic}/>
            </div>
        </div>
    )
}