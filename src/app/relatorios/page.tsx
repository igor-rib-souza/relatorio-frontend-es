"use client"
import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import styles from "./page.module.css";
import Relatorio from "../../components/relatorios/relatorios";
import api from "../../services/api"
import { SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Calendar, Send } from "lucide-react";

export default function Relatorios() {

  const [text, setText] = useState("");

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const [reports, setReports] = useState({
    "reports": [
      {
        "_id": "",
        "user": "",
        "date": "0000-00-00T00:00:00.000Z",
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
      then((response) => {if (response.data.reports[0]._id != "") {setReports(response.data);}   })
      .catch((error) => { alert(error.data) })
  }

  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports])

  async function sendReport() {

    await api.post(`/report/${user.user._id}`, {
      user: user.user._id,
      date: "2021/03/01",
      startTime: "00:00",
      endTime: "11:00",
      text: text,
      tags: ["chatuba"]
    },
      {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      }
    ).then((response) => setText("")
    ).catch((error) => console.log(error.response.data))
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container2}>
        <div>
          <Menu />
        </div>
        <div className={styles.container3}>
          {<Relatorio relatorios={reports} />}
          {/*
            A parte abaixo é referente ao footer 
          */}
          <div className={styles.container4}>
            <div className={styles.searchContainer}>
              <form className={styles.formContainer}>
                <input className={styles.inputContainer} placeholder="Relatório" value={text} onChange={handleChange}></input>
              </form>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.iconBackground}>
                <Calendar className={styles.icon} />
              </div>
              <button className={styles.iconBackground} onClick={() => {sendReport(); getReports()}}>
                <Send className={styles.icon} />
              </button>
            </div>
          </div>
          {/*
            A div acima é o final do footer 
          */}
        </div>
      </div>
    </div>
  )
}