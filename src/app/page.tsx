"use client";
import styles from './page.module.css'
import Login from "../app/login/page"

export default function Home() {
  return (
  <Login onSubmit={function (email: string, password: string): void {
      throw new Error('Function not implemented.')
    } }/>
  )
}
