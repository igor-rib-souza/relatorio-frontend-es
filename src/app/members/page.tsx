"use client"
import dynamic from 'next/dynamic'
import styles from './page.module.css';

import api from '@/services/api';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Ausente from '../../../public/assets/foto-usuario-ausente.jpg';
import Image from 'next/image';
import { Settings, User2, Mail, Lock, User, Ban } from "lucide-react";

const Header = dynamic(() => import('../../components/header/header'), { ssr: true });
const Menu = dynamic(() => import('../../components/menu/menu'), { ssr: true });

const Members = () => {



    const [members, setMembers] = useState([])
    const [user, setUser] = useState(null);

    // Check if window object is defined before accessing cookies
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const cookies: any = Cookies.get("user");
          if (cookies) {
            try {
              const parsedUser = JSON.parse(cookies);
              setUser(parsedUser);
            } catch (error) {
              console.error("Error parsing user cookie:", error);
            }
          }
        }
      }, []);
      
  
    const adm = user?.user?.type === "adm";
    const [popUp, setPopUp] = useState(false);

    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userFunction, setUserFunction] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState({
        '_id': '',
        'name': '',
        'userFunction': '',
        'email': 'email'
    });
    const [showDetails, setShowDetails] = useState(false);
    const [modalDelete, setModalDelete] = useState(false)


    async function createMember() {
        await api.post(`user/${user.user._id}`, {
            name: name,
            email: email,
            password: password,
            userFunction: userFunction
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).then(() => {
            setName('');
            setEmail('');
            setPassword('');
            setUserFunction('');
            setConfirmPassword('');
        }).catch((error) => console.log(error))
    }

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
        if (user) {
          getMembers();
        }
      }, [user, members]);

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

    function check() {
        if (name != "" && email != "" && password != "" && confirmPassword != "" && userFunction != "" && password == confirmPassword) {
            setPopUp(false), createMember(), getMembers()
        }


        else if (password.localeCompare(confirmPassword)) {

            setShowError(true)
            setErrorMessage("As senhas precisam ser iguais")
        }

        else {
            setShowError(true)
            setErrorMessage("Preencha todos os campos")
        }
    }

    async function deleteUser() {
        await api.delete(`user/${user.user._id}/${selectedUser._id}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            }).then((responnse) => {
                getMembers()
            }).catch((error) => console.log(error))
    }

    return (
        <div className={styles.container}>
            {
                modalDelete ?
                    <div className={styles.centered}>
                        <div className={styles.modalDelete} >
                            <p className={styles.deleteText}>Tem certeza que deseja deletar o membro?</p>
                            <div className={styles.inputContainer} color='#616269'>
                                <User2 color='#121C54' />
                                <p className={styles.input}>{selectedUser.name}</p>
                            </div>
                            <div className={styles.button} style={{ backgroundColor: '#2A73C5', }} onClick={() => { setModalDelete(false), deleteUser() }}>
                                <p className={styles.textButton}>
                                    Excluir Usuário
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                showDetails ?
                    <div className={styles.centered}>
                        <div className={styles.details}>
                            <div className={styles.inputContainer}>
                                <User2 color='#121C54' />
                                <p className={styles.input}>{selectedUser.name}</p>
                            </div>
                            <div className={styles.inputContainer}>
                                <Settings color='#121C54' />
                                <p className={styles.input}>{selectedUser.userFunction}</p>
                            </div>
                            <div className={styles.inputContainer}>
                                <Mail color='#121C54' />
                                <p className={styles.input}>{selectedUser.email}</p>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                popUp ?
                    <div className={styles.centered}>
                        <div className={styles.modal} style={showError ? { height: "80vh" } : {}}>
                            <div className={styles.inputContainer}>
                                <Settings color='#121C54' />
                                <input
                                    className={styles.input}
                                    placeholder='Função'
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
                                <div className={styles.button2} onClick={() => { check() }}>
                                    <p className={styles.textButton}>
                                        Criar Membro
                                    </p>
                                </div>
                                <div className={styles.container3}>
                                    <div className={styles.line} />
                                    <p style={{ fontSize: '2vh', paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '2vh', paddingBottom: '2vh' }}>ou</p>
                                    <div className={styles.line} />
                                </div>
                                <div className={styles.button2} style={{ backgroundColor: "#162369", boxShadow: "0px 4px 0px #111A4F" }} onClick={() => { setPopUp(false), setShowError(false), setErrorMessage('') }}>
                                    <p className={styles.textButton}>
                                        Cancelar
                                    </p>
                                </div>
                            </div>
                            {showError &&
                                <div className={styles.error}>
                                    <Ban />
                                    <p>{errorMessage}</p>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    null
            }
            <Header />
            <div className={styles.container2}>
                <Menu />
                <div style={{ overflowY: 'auto', scrollbarWidth: 'thin', marginBottom: '1vh' }}>
                    {
                        members.map((member: any, index: Key | null | undefined) => (
                            <div className={styles.containerMember} key={index} style={selectedUser._id == member._id ? { backgroundColor: '#2A73C5' } : {}} onClick={() => setSelectedUser(member)}>

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

                                <div className={styles.button} style={{ backgroundColor: '#2A73C5', }} onClick={() => setModalDelete(!modalDelete)}>
                                    <p className={styles.textButton}>
                                        Excluir Usuário
                                    </p>
                                </div>
                            </div>
                            :
                            null
                    }

                    <div onClick={() => { selectedUser._id != '' ? setShowDetails(!showDetails) : null }} className={styles.button} style={{ backgroundColor: '#162369', boxShadow: '0px 4px 0px #111A4F' }}>
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