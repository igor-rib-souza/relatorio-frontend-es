"use client"
import Tag from '@/components/Tag/tagField'
import Header from '@/components/header/header';
import styles from './page.module.css';
import Menu from '@/components/menu/menu';
import api from '@/services/api';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Tags = () => {

    const [tags, setTags] = useState('')
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const adm = user.user.type === "adm";
    const [popUp, setPopUp] = useState(false)

    async function getTags() {
        await api.get(`tag/all`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).
            then((response) => {
                console.log(response.data)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        getTags()
    }, [tags])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.container2}>
                <Menu />
                <div className={styles.tagContainer}>
                    <Tag textContent={"cabeca de gelo"} color={''} isChecked={false} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                        throw new Error('Function not implemented.');
                    } } />


                </div>
                <div className={styles.containerButtons} >
                    <div className={styles.button} style={{ backgroundColor: '#2A73C5' }}>
                        <p className={styles.textButton} onClick={() => setPopUp(true)}>
                            Criar Nova Tag
                        </p>
                    </div>

                    <div className={styles.button} style={{ backgroundColor: '#2A73C5', }}>
                        <p className={styles.textButton}>
                            Editar Permissões
                        </p>
                    </div>
                    <div className={styles.button} style={{ backgroundColor: '#162369', boxShadow: '0px 4px 0px #111A4F' }}>
                        <p className={styles.textButton}>
                            Exibir Detalhes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tags;