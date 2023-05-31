"use client"
import Header from '@/components/header/header';
import styles from './page.module.css';
import Menu from '@/components/menu/menu';
import api from '@/services/api';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Ausente from '../../../public/assets/foto-usuario-ausente.jpg';
import Image from 'next/image';


const Members = () => {

    const [members, setMembers] = useState([])
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const adm = user.user.type === "adm";
    const [popUp, setPopUp] = useState(false)


    async function getMembers() {
        await api.get(`user/all`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).
            then((response) => {
                setMembers(response.data.users)
                console.log(members)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        getMembers()
    }, [members])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.container2}>
                <Menu />
                <div>
                    {
                        members.map((member: any, index: Key | null | undefined) => (
                            <div className={styles.containerMember} key={index} style={index == 0 ? { marginTop: '5vh' } : {}} onClick={() => console.log(member)}>
                                <Image src={member.profilePic.url != null ? member.profilePic.url : Ausente} alt='' width={200} height={200} className={styles.profilePic}></Image>
                                <div className={styles.containerText}>
                                    <p className={styles.memberName}>{member.name}</p>
                                    <p>{member.userFunction}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.containerButtons} >
                    <div className={styles.button} style={{ backgroundColor: '#2A73C5' }}>
                        <p className={styles.textButton} onClick={() => setPopUp(true)}>
                            Criar Novo Usuário
                        </p>
                    </div>

                    <div className={styles.button} style={{ backgroundColor: '#2A73C5', }}>
                        <p className={styles.textButton}>
                            Excluir Usuário
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

export default Members;