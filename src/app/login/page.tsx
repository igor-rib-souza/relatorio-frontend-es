import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
    return ( 
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer}>
                <h1 className={styles.loginText}>Faça seu login na plataforma</h1>
                <form className={styles.formContainer}>
                    <div className={styles.fieldContainer}>
                        <Mail className={styles.iconContainer} size={24}/>
                        <input className={styles.inputContainer} type="email" id="email" name="email" placeholder="email@codexjr.com.br"/>
                    </div>
                    <div className={styles.fieldContainer}>
                        <Lock className={styles.iconContainer} size={24}/>
                        <input className={styles.inputContainer} type="password" id="password" name="password" placeholder="password"/>
                    </div>
                    <input className={styles.loginButton} type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}