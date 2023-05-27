"use client"
import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import Footer from "../../components/footer/footer";
import styles from "./page.module.css";
import Relatorio from "../../components/relatorios/relatorios";
import api from "../../services/api"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { number, set } from "zod";

export default function Relatorios() {

  const [reports, setReports] = useState({
    "reports": [
      {
        "_id": "",
        "user": "",
        "date": "",
        "startTime": "",
        "endTime": "",
        "text": "",
        "tags": [
          ""
        ],
        "createdAt": "",
        "updatedAt": "",
        "__v": 0

      }
    ]
  });
  const cookies: string = Cookies.get("user");
  const user = JSON.parse(cookies)

  async function getReports() {
    await api.get(`report/${user.user._id}/01012000/01012024`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).
      then((response) => { setReports(response.data); })
      .catch((error) => { alert(error.data) })
  }

  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container2}>
        <div>
          <Menu />
        </div>
        <div className={styles.container3}>
          {<Relatorio relatorios={reports} />}
          <Footer/>
        </div>
      </div>
    </div>
  )
}