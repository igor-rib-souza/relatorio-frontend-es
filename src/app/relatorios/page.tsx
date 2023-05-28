"use client"
import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import styles from "./page.module.css";
import Relatorio from "../../components/relatorios/relatorios";
import api from "../../services/api"
import { SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Calendar, Send } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addHours, format } from 'date-fns';



export default function Relatorios() {

  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("00:00")
  const [showTime, setShowTime] = useState(false);


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
  const cookies:any = Cookies.get("user");
  const user = JSON.parse(cookies);
  const adm = user.user.type == "adm";

  async function getReports() {
    await api.get(`report/${user.user._id}/01010000/12129999`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).
      then((response) => { if (response.data.reports[0]._id != "") { setReports(response.data); } })
      .catch((error) => { console.log(error.data) })
  }

  async function getReportsAdm() {
    await api.get(`report/all/${user.user._id}/01010000/12129999`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).
      then((response) => { if (response.data.reports[0]._id != "") { setReports(response.data); } })
      .catch((error) => { console.log(error.data) })
  }

  useEffect(() => {
    {
      adm ?
        getReports()
        :
        getReportsAdm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports])

  async function sendReport() {

    await api.post(`/report/${user.user._id}`, {
      user: user.user._id,
      date: format(startDate, "dd/MM/yyyy"),
      startTime: format(startDate, "HH:mm"),
      endTime: format(addHours(startDate, 1), "HH:mm"),
      text: text,
      tags: ["tag"]
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
        <div className={`${styles.datePicker} ${styles.centered}`}>
          {showTime ?
            <DatePicker
              selected={startDate}
              onChange={(date:any) => setStartDate(date)}
              showTimeSelect
              inline
            />
            :
            <></>
          }
        </div>
        <div>
          <Menu />
        </div>
        <div className={styles.container3}>
          {<Relatorio relatorios={reports}/>}

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

              <div className={styles.iconBackground} onClick={() => setShowTime(!showTime)}>
                <Calendar className={styles.icon} />
              </div>
              <button className={styles.iconBackground} onClick={() => { sendReport(); { adm ? getReportsAdm() : getReports() } setShowTime(false) }}>
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