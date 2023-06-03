"use client";
import styles from "./page.module.css"
import Logo from "../../../public/assets/Logo.png"
import LogoMinimalista from "../../../public/assets/logo-minimalista.png"
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg"
import Image from 'next/image';
import { Cog, Search } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import { User2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { headers } from "next/dist/client/components/headers";
import api from "@/services/api";



export default async function Header() {

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

    const modalProfileSettings = document.getElementById("modalProfileSettings") as HTMLDialogElement;

    function profileSettings() {
        if (modalProfileSettings) {
            modalProfileSettings.showModal();
        }
    }

    function logout() {
        Cookies.set("user", JSON.stringify(mockUser))
        router.replace('/login')
    }



   async function uploadProfileImage(){
        {/**{<input type="file" id="fileInput" />
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
        const formData = new FormData();
        if (file){
            formData.append('file', file);
        }   else {
            // O arquivo não foi selecionado
            console.log('Nenhum arquivo selecionado');
        }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`
             },
              };}
        
            await api.post(`user/image/${user.user._id}`,formData, config)
            **/}
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
            
            if (file) {
              const formData = new FormData();
              formData.append('file', file);
            
              const config = {
                headers: {
                  'Authorization': 'Bearer your-token',
                },
              };
            
              api.post(`user/image/${user.user._id}`, formData, config)
                .then(response => {
                  console.log('Foto de perfil atualizada com sucesso');
                })
                .catch(error => {
                  console.error('Erro ao atualizar a foto de perfil:', error);
                });
            } else {
              console.log('Nenhum arquivo selecionado');
            }
            
            
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
                <Image src={profilePic != null ? profilePic : Ausente} alt={"Profile picture"} className={styles.profilePic} onClick={() => toggleMenu()} width={100} height={100} />
                <div className={styles.subMenuWrap} id="menu">
                    <div className={styles.subMenu}>
                        <p onClick={() => profileSettings()}>Editar Perfil</p>
                        <p>Exibir analytics de Relatórios</p>
                        <p>Meus Relatórios</p>
                        <hr />
                        <p onClick={() => logout()}>Sair</p>
                    </div>
                </div>

                {/* Aqui abaixo começa o modal de Editar Perfil */}

                {/* Atualizar Foto */}


      
{/**/}

                <dialog id="modalProfileSettings" className={styles.modalProfileSettings}>
                    <div className={styles.containerChangePic}>
                        <Image src={Ausente} alt={"Profile picture"} className={styles.settingsProfilePic} />
                        <button className={styles.changePic} >
                            <ImagePlus className={styles.iconContainer} onClick ={() => uploadProfileImage()}/>
                            {"Atualizar Foto"}
                        </button>
                    </div>

                    {/*Editar nome do usário*/}

                    <div className={styles.fieldContainer}>
                        <div
                            style={{ display: 'flex', alignItems: 'center' }}>
                            <User2 className={styles.iconContainer} size={24} style={{ color: '#121C54' }} />
                            <p style={{ marginLeft: '1px' }}>Nome</p>
                        </div>
                        <input
                            className={styles.inputContainer}
                            type="name"
                            id="name"
                            name="name"
                            placeholder={(user.name)}
                            style={{ borderBottom: '1px solid #121C54', color: '#616269' }}
                        />
                    </div>

                    {/*Editar função do usário*/}

                    <div className={styles.fieldContainer}><div
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <Cog className={styles.iconContainer} size={24} style={{ color: '#121C54' }} />
                        <p style={{ marginRight: '1px' }}>Função</p></div>
                        <input
                            className={styles.inputContainer}
                            type="text"
                            id="function"
                            name="function"
                            placeholder={user.function}
                            style={{ borderBottom: '1px solid #121C54', color: '#616269' }}
                        />
                    </div>
                    <button className={styles.button}>Atualizar</button>
                </dialog>
            </div>
        </div>
    )
    }

