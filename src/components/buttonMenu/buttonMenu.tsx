"use client";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";
import styles from "./page.module.css";
import { Users, Newspaper, Tag, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';


export default function ButtonMenu(props: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }){
    
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(()=>{
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    },[])

    return(
            <div>
                <button className={styles.button} onClick={()=> console.log(windowSize)}>
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
                    {
                        windowSize.width > 309 ?
                        <p className={styles.text}>{props.text}</p>
                        :
                        <></>
                    }
                </button>
           </div>
    )
}