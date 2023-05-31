"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Users, Newspaper, Tag, LogOut } from "lucide-react";

export default function ButtonMenu(props: { text: string }) {
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
    };
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

    function logout() {
        Cookies.set("user", JSON.stringify(mockUser));
        router.replace('/login');
    }

    const handleButtonClick = () => {
        switch (props.text) {
            case "Sair":
                logout();
                break;
            case "Relatórios":
                router.replace('relatorios');
                break;
            case "Tags":
                router.push('tags');
            default:
                console.log("f");
                break;
        }
    };

    return (
        <div>
            <button className={styles.button} onClick={handleButtonClick} style={windowSize.width > 700 ? { justifyContent: 'flex-start' } : { justifyContent: 'center' }}>
                {props.text === "Relatórios" ? <Newspaper className={styles.ButtonMenu} /> :
                    props.text === "Membros" ? <Users className={styles.ButtonMenu} /> :
                        props.text === "Tags" ? <Tag className={styles.ButtonMenu} /> :
                            props.text === "Sair" ? <LogOut className={styles.ButtonMenu} /> : null
                }
                {windowSize.width > 700 ? <p className={styles.text}>{props.text}</p> : null}
            </button>
        </div>
    );
}
