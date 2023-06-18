"use client"
import Header from '@/components/header/header';
import styles from './page.module.css';
import Menu from '@/components/menu/menu';
import api from '@/services/api';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Tag } from 'lucide-react';

const Tags = () => {

    const [tags, setTags] = useState([])
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const adm = user.user.type === "adm";
    const [popUp, setPopUp] = useState(false)
    const [tagName, setTagName] = useState('');

    async function getTags() {
        await api.get(`tag/all`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).
            then((response) => {
                setTags(response.data.tags)
            })
            .catch((error) => { console.log(error.response.data) })
    }

    useEffect(() => {
        getTags()
    }, [tags])

    const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTagName(value);
    }

    async function createTag() {
        api.post(`tag/${user.user._id}`,
            {
                'name': tagName,
                'color': ''
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            }).then(() => { setTagName('') })
            .catch((error) => console.log(error))
    }

    return (
        <div className={styles.container}>
            {
                popUp ?
                    <div className={styles.centered}>
                        <div className={styles.modal}>
                            <div className={styles.inputContainer} color='#616269'>
                                <Tag color='#121C54' />
                                <input className={styles.input} placeholder='Nome da tag' onChange={handleTagNameChange} />
                            </div>
                            <div className={styles.button2} onClick={() => { setPopUp(!popUp), createTag(), getTags() }}>
                                <p className={styles.textButton}>
                                    Criar Tag
                                </p>
                            </div>
                            <div className={styles.container3}>
                                <div className={styles.line} />
                                <p style={{ fontSize: '2vh', paddingLeft: '1vw', paddingRight: '1vw', }}>ou</p>
                                <div className={styles.line} />
                            </div>
                            <div className={styles.button2} style={{ backgroundColor: "#162369", boxShadow: "0px 4px 0px #111A4F" }} onClick={() => { setPopUp(false) }}>
                                <p className={styles.textButton}>
                                    Cancelar
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <Header />
            <div className={styles.container2}>
                <Menu />
                <div style={{ overflowY: 'scroll', scrollbarWidth: 'thin', marginBottom: '1vh' }}>
                    {
                        tags.map((tag: any, index: Key | null | undefined) => (
                            <div className={styles.containerMember} key={index} >

                                <div className={styles.containerText}>
                                    <p className={styles.memberName}>{tag.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.containerButtons} >
                    <div className={styles.button} style={{ backgroundColor: '#2A73C5' }} onClick={() => setPopUp(!popUp)}>
                        <p className={styles.textButton} >
                            Criar Nova Tag
                        </p>
                    </div>

                    {/*
                        Escondendo botões devido a falta de funções, mas eles existem na prototipação
                    */}

                    {
                        false ?
                            <div>                    <div className={styles.button} style={{ backgroundColor: '#2A73C5', }}>
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
                            :
                            null

                    }

                </div>
            </div>
        </div>
    )
}

export default Tags;