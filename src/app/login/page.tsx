"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

import Cookies from  'js-cookie';
import { Mail, Lock, Ban } from 'lucide-react';
import Link from 'next/link';

import api from '../../services/api';
import styles from './page.module.css';

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await api.post('login',{"email":email, "password":password});
            Cookies.set("user", JSON.stringify(response.data));
            router.push("/relatorios");
        } catch (error: any) {
            console.log(error.response?.data);
            if (error.response?.status >= 400 && error.response?.status <= 500) {
                setError(error.response.data.message)
            }
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    };
    
    const handleForgotPassword = () => {
        if (email) {
            const response = api.post('/RequestPasswordRecovery', { email });
            router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
        } else {
            setError("Por favor, insira seu e-mail");
        }
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
                    <button type="button"
                        className={styles.forgotPassword}
                        onClick={handleForgotPassword}
                    >
                        Esqueceu sua senha?
                    </button>
                    {error && 
                        <div className={styles.error}>
                            <Ban/>
                            <p>{error}</p>
                        </div>
                    }
                    <input className={styles.loginButton} type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}