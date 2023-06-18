"use client";
import styles from "./page.module.css";
import Logo from "../../../public/assets/Logo.png";
import LogoMinimalista from "../../../public/assets/logo-minimalista.png";
import Ausente from "../../../public/assets/foto-usuario-ausente.jpg";
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Settings, User2, FileX2, FileCheck2, FileClock } from "lucide-react";
import api from "@/services/api";

export default function Header() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const cookies: any = Cookies.get("user");
  const [user, setUser] = useState(JSON.parse(cookies));
  const profilePic = user.user.profilePic.url;
  const [modal, setModal] = useState(false);
  const [userFunction, setUserFunction] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [reportModal, setReportModal] = useState(false);

  let menu = document.getElementById("menu");

  async function getUser() {
    await api.get(`user/${user.user._id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then((response) => {
      setUser(response.data)
  })
  }

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

  async function editUser() {
    const formData = new FormData();
    {
      name != '' ?
      formData.append('name', name)
      :
      null
    }

    {
      userFunction != '' ?
      formData.append('userFunction', userFunction)
      :
      null
    }
    {
      selectedImage != '' ?
      formData.append('file', selectedImage)
            :
      null
    }
     // Incluído o valor de selectedImage no FormData

    api.put(`user/${user.user._id}/${user.user._id}`, formData, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).then(() => getUser());
  }

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

  function logout() {
    Cookies.set("user", JSON.stringify(mockUser));
    router.replace('/login');
  }

  const handleFunctionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserFunction(value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    setSelectedImage(file);
    console.log(file);
  };

  const toggleReportModal = () => {
    setReportModal(!reportModal);
  };  

  return (
    <div className={styles.container}>
      {modal ? (
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={""}
                alt={""}
                className={styles.profilePic}
              />
              <input
                name="foto"
                className={styles.inputFile}
                type="file"
                accept="image/*"
                placeholder='Atualizar Foto'
                onChange={handleImageChange}
              />
            </div>
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

            <div className={styles.button} style={{ backgroundColor: '#2A73C5' }} onClick={() => { setModal(false); editUser(); }}>
              <p className={styles.textButton}>
                Atualizar
              </p>
            </div>
            <div className={styles.button2} style={{ backgroundColor: "#162369", boxShadow: "0px 4px 0px #111A4F" }} onClick={() => { setModal(false) }}>
              <p className={styles.textButton}>
                Cancelar
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {reportModal ? (
        <div className={styles.centered}>
          <div className={styles.modal}>
            <h1>Sobre Meus Relatórios</h1>
            <div className={styles.inputContainer}>
              <FileX2 color='#121C54' />
              <input
                disabled={true}
                className={styles.input}
                placeholder='Totais não enviados'
              />
            </div>
            <div className={styles.inputContainer}>
              <FileCheck2 color='#121C54' />
              <input
                disabled={true}
                className={styles.input}
                placeholder='Totais enviados'
              />
            </div>
            <div className={styles.inputContainer}>
              <FileClock color='#121C54' />
              <input
                disabled={true}
                className={styles.input}
                placeholder='Enviados com Atraso'
              />
            </div>
            <div className={styles.button} style={{ backgroundColor: '#2A73C5' }} onClick={() => { setReportModal(false) }}>
              <p className={styles.textButton}>
                Fechar
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.headerContainer}>
        <Image
          src={windowSize.width > 700 ? Logo : LogoMinimalista}
          alt={""}
          className={windowSize.width > 500 ? styles.Logo : styles.LogoMinimalista}
        />
        <div className={styles.searchContainer}>
          <form className={styles.formContainer}>
            <input className={styles.inputContainer} placeholder="Buscar Tags..."></input>
          </form>
          <Search className={styles.iconContainer} size={20} />
        </div>
        <Image
          src={profilePic != null ? profilePic : Ausente}
          alt={"Profile picture"}
          className={styles.profilePic}
          onClick={() => toggleMenu()}
          width={200}
          height={200}
        />
        <div className={styles.subMenuWrap} id="menu">
          <div className={styles.subMenu}>
            <p onClick={() => setModal(!modal)}>Editar Perfil</p>
            <p>Exibir analytics de Relatórios</p>
            <p onClick={toggleReportModal}>Meus Relatórios</p>
            <hr />
            <p onClick={() => logout()}>Sair</p>
          </div>
        </div>
      </div>
    </div>
  );
}
