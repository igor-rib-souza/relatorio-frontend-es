"use client";
import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

export default function Login(props: LoginProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const response = await api.post('/login', { email, password });
          props.onSubmit(email, password);
        } catch (error) {
          console.error('Erro ao fazer login:', error);
        }
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
                    <input className={styles.loginButton} type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}