"use client";
import styles from './page.module.css';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';

interface ForgotPasswordProps {
    onSubmit: (password: string, passwordConfirmation: string) => void;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.changePasswordContainer}>
          <h1 className={styles.changePasswordText}>Altere sua senha</h1>
          <form className={styles.formContainer}>
            <div className={styles.fieldContainer}>
              <Lock className={styles.iconContainer} size={24} />
              <input
                className={styles.inputContainer}
                type="password"
                id="password"
                name="password"
                placeholder="Nova senha"
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
                required
              />
            </div>
            <input className={styles.changePasswordButton} type="submit" value="Alterar senha" />
          </form>
        </div>
      </div>
    );
  }