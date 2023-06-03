"use client"
import Header from '@/components/header/header';
import styles from './page.module.css';
import Menu from '@/components/menu/menu';
import api from '@/services/api';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Ausente from '../../../public/assets/foto-usuario-ausente.jpg';
import Image from 'next/image';
import { Settings, User2, Mail, Lock, User } from "lucide-react";


const Members = () => {

    const [members, setMembers] = useState([])
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const adm = user.user.type === "adm";
    const [popUp, setPopUp] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userFunction, setUserFunction] = useState('');


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

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setConfirmPassword(value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handleFunctionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserFunction(value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    return (
        <div className={styles.container}>
            {
                popUp ?
                    <div className={styles.centered}>
                        <div className={styles.modal}>
                            <div className={styles.inputContainer}>
                                <Settings color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='Função'
                                    value={userFunction}
                                    onChange={handleFunctionChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <User2 color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='Nome'
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <Mail color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='email@codexjr.com.br'
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <Lock color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='Password'
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <Lock color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='Confirm password'
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>

                            <div>
                                <div className={styles.button2}>
                                    <p className={styles.textButton}>
                                        Criar Membro
                                    </p>
                                </div>
                                <div className={styles.container3}>
                                    <div className={styles.line} />
                                    <p style={{ fontSize: '2vh', paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh' }}>ou</p>
                                    <div className={styles.line} />
                                </div>
                                <div className={styles.button2} style={{ backgroundColor: "#162369", boxShadow: "0px 4px 0px #111A4F" }} onClick={() => setPopUp(false)}>
                                    <p className={styles.textButton}>
                                        Cancelar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
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
                    {
                    adm ? 
                    <div>
                        <div className={styles.button} style={{ backgroundColor: '#2A73C5' }} onClick={() => setPopUp(!popUp)}>
                        <p className={styles.textButton} >
                            Criar Novo Usuário
                        </p>
                    </div>

                    <div className={styles.button} style={{ backgroundColor: '#2A73C5', }}>
                        <p className={styles.textButton}>
                            Excluir Usuário
                        </p>
                    </div>
                    </div>
                    : 
                    null
                    }
                    
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