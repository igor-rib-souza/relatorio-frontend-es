"use client";
import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';
import Cookies from  'js-cookie';
import { useRouter } from "next/navigation";



interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

export default function Login(props: LoginProps) {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState({
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
    });

    const [error, setError] = useState("");

    const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        await api.post('login',{"email":email, "password":password})
            .then((response) => {
                Cookies.set(response.data, JSON.stringify(user));
                router.push("/relatorios");
            })
            .catch((error) => {
                console.log(error.response.data);
                if(error.response && error.response.status >= 400 && error.response.status <= 500)
                {
                setError(error.response.data.message)
                }
            })
      };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    return ( 
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer}>
                <h1 className={styles.loginText}>Faça seu login na plataforma</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.fieldContainer}>
                        <Mail className={styles.iconContainer} size={24} />
                        <input 
                            className={styles.inputContainer}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@codexjr.com.br"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className={styles.fieldContainer}>
                        <Lock className={styles.iconContainer} size={24} />
                        <input 
                            className={styles.inputContainer}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <input className={styles.loginButton} type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}