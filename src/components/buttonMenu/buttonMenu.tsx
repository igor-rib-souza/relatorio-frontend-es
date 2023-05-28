"use client";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";
import styles from "./page.module.css";
import { Users, Newspaper, Tag, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";



export default function ButtonMenu(props: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) {

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
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, [])


    function logout() {
        Cookies.set("user", JSON.stringify(mockUser))
        router.replace('/login')
    }



    return (
        <div>
            <button className={styles.button} onClick={() => { props.text == "Sair" ? logout() : props.text == "Relatórios" ? router.replace('relatorios') : console.log("f") }}>
                {
                    props.text == "Relatórios" ? <Newspaper className={styles.ButtonMenu} />
                        :
                        props.text == "Membros" ? <Users className={styles.ButtonMenu} />
                            :
                            props.text == "Tags" ? <Tag className={styles.ButtonMenu} />
                                :
                                props.text == "Sair" ? <LogOut className={styles.ButtonMenu} />
                                    :
                                    <></>
                }
                {
                    windowSize.width > 500 ?
                        <p className={styles.text}>{props.text}</p>
                        :
                        <></>
                }
            </button>
        </div>
    )
}