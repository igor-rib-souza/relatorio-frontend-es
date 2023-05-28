"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ArrowRight, Clock } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addHours, format } from 'date-fns';
import api from "@/services/api";
import Cookies from "js-cookie";

export default function Relatorios(relatorios: any) {
  const cookies: any = Cookies.get("user");
  const user = JSON.parse(cookies);
  const adm = user.user.type == "adm";
  const [data, setData] = useState(relatorios["relatorios"]["reports"]);
  const [showTime, setShowTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [close, setClose] = useState(false);
  const mock = {
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
  }
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  //TODO TERMINAR INTEGRAÇÃO GET POR DATA
  //TODO ADICIONAR GET POR DATA DO ADM
  async function getReports(start: number | Date, end: number | Date) {
    await api.get(`report/${user.user._id}/${format(start, "ddMMyyyy")}/${parseInt(format(end, "ddMMyyyy"))}}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).
      then((response) => {
        if (response.data.reports.length > 0) {
          setData(response.data.reports)
        }
        else {
          setData(mock.reports)
        }
      })
      .catch((error) => { console.log(error) })
  }

  async function getReportsAdm(start: number | Date, end: number | Date) {
    await api.get(`report/all/${user.user._id}/${format(start, "ddMMyyyy")}/${parseInt(format(end, "ddMMyyyy"))}}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    }).
      then((response) => {
        if (response.data.reports.length > 0) {
          setData(response.data.reports)
        }
        else {
          setData(mock.reports)
        }
      })
      .catch((error) => { console.log(error) })
  }


  useEffect(() => {


    if (!adm && endDate != null) {
      getReports(startDate, endDate);
    }
    else if (adm && endDate != null) {
      getReportsAdm(startDate, endDate);
    }

    console.log(endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate])

  return (
    <div className={styles.container}>
      <div className={`${styles.datePicker} ${styles.centered}`}>
        {showTime ?
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          :
          <></>
        }
      </div>
      <div className={styles.headerRelatorio}>
        <div className={styles.containerHeaderData} onClick={() => setShowTime(!showTime)}>
          <p className={styles.date}>{data[0]["date"].slice(8, 10)}/{data[0]["date"].slice(5, 7)}/{data[0]["date"].slice(0, 4)}</p>
          <ArrowRight className={styles.arrow} size={13} />
          <p className={styles.date}>{data[data.length - 1]["date"].slice(8, 10)}/{data[data.length - 1]["date"].slice(5, 7)}/{data[data.length - 1]["date"].slice(0, 4)}</p>
        </div>
      </div>
      <div className={styles.containerRelatorio}>
        {data[0]._id != "" ?
          data.map((relatorio: any, index: number) => (
            <div key={index} className={styles.relatorio}>
              <div className={styles.dateRelatorio}>
                <p className={styles.textDate}>{relatorio.date.slice(8, 10)}/{relatorio.date.slice(5, 7)}/{relatorio.date.slice(0, 4)}</p>
              </div>
              <div className={styles.containerRelatorIndividual}>
                <div className={styles.containerGlobalTimeTags}>
                  <div className={styles.containerTimeTags}>
                    <Clock size={15} />
                    <p className={styles.timeText}>{relatorio["startTime"]}</p>
                    <ArrowRight
                      className={styles.arrow}
                      size={15}
                      color={"black"}
                    />
                    <p className={styles.timeText}>{relatorio["endTime"]}</p>
                  </div>
                  {data[index]["tags"].map((tags: any, index: number) => (
                    <div key={index} className={styles.tagContainer}>
                      <p className={styles.tagText} key={index}>{relatorio["tags"][index]}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.containerTextRelatorio}>
                  <p className={styles.text}>{relatorio["text"]}</p>
                </div>
              </div>
            </div>
          )) :
          <></>}
      </div>
    </div>);
}
