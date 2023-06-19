"use client";
import React, { useState } from 'react';
import { Ban, Hash, Lock } from 'lucide-react';
import api from '../../services/api';
import styles from './page.module.css';

interface ForgotPasswordProps {
  onSubmit: (code: string, password: string, passwordConfirmation: string) => void;
}

export default function ForgotPassword({ onSubmit }: ForgotPasswordProps) {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setError('A confirmação de senha não corresponde à nova senha.');
      return;
    }

    try {
      const response = await api.post('/change-password', { code, password, passwordConfirmation });
      onSubmit(code, password, passwordConfirmation);
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      setError('Erro ao alterar senha. Por favor, tente novamente!');
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
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
        <h1 className={styles.changePasswordTitle}>Altere sua senha</h1>
        <p className={styles.changePasswordText}>O código de alteração foi enviado para o seu e-mail</p>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.fieldContainer}>
            <Hash className={styles.iconContainer} size={24} />
            <input
              className={styles.inputContainer}
              type="text"
              id="code"
              name="code"
              placeholder="Código de alteração"
              value={code}
              onChange={handleCodeChange}
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
          {error && 
            <div className={styles.error}>
              <Ban/>
              <p>{error}</p>
            </div>
          }
          <input className={styles.changePasswordButton} type="submit" value="Alterar senha" />
        </form>
      </div>
    </div>
  );
}