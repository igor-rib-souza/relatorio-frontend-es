"use client";
import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';

interface ForgotPasswordProps {
    onSubmit: (password: string, passwordConfirmation: string) => void;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const response = await api.post('/change-password', { password, passwordConfirmation });
        props.onSubmit(password, passwordConfirmation);
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
      }
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirmation(event.target.value);
    };
  
    return (
      <div className={styles.pageContainer}>
        <div className={styles.changePasswordContainer}>
          <h1 className={styles.changePasswordText}>Altere sua senha</h1>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <Lock className={styles.iconContainer} size={24} />
              <input
                className={styles.inputContainer}
                type="password"
                id="password"
                name="password"
                placeholder="Nova senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className={styles.fieldContainer}>
              <Lock className={styles.iconContainer} size={24} />
              <input
                className={styles.inputContainer}
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirme a nova senha"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                required
              />
            </div>
            <input className={styles.changePasswordButton} type="submit" value="Alterar senha" />
          </form>
        </div>
      </div>
    );
  }