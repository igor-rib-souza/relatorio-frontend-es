"use client"
import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import styles from "./page.module.css";
import Relatorio from "../../components/relatorios/relatorios";
import api from "../../services/api";
import Cookies from "js-cookie";
import { Calendar, Send } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addHours, format } from "date-fns";

const Relatorios = () => {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [render, setRender] = useState(false)
  const [reports, setReports] = useState({
    reports: [
      {
        _id: "",
        user: "",
        date: "0000-00-00T00:00:00.000Z",
        startTime: "",
        endTime: "",
        text: "",
        tags: [""],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
    ],
  });

  const cookies: any = Cookies.get("user");
  const user = JSON.parse(cookies);
  const adm = user.user.type === "adm";

  const handleChange = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  }, []);

  const getReports = useCallback(async () => {
    try {
      const response = await api.get(`report/${user.user._id}/01010000/12129999`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data.reports[0]._id !== "") {
        setReports(response.data);
      }
    } catch (error: any) {
      console.log(error.data);
    }
  }, [user.user._id, user.token]);

  const getReportsAdm = useCallback(async () => {
    try {
      const response = await api.get(`report/all/${user.user._id}/01010000/12129999`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data.reports[0]._id !== "") {
        setReports(response.data);
      }
    } catch (error: any) {
      console.log(error.data);
    }
  }, [user.user._id, user.token]);

  const sendReport = useCallback(async () => {
    try {
      await api.post(
        `/report/${user.user._id}`,
        {
          user: user.user._id,
          date: format(startDate, "dd/MM/yyyy"),
          startTime: format(startDate, "HH:mm"),
          endTime: format(addHours(startDate, 1), "HH:mm"),
          text: text,
          tags: ["tag"],
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setText("");
    } catch (error: any) {
      console.log(error.response.data);
    }
  }, [startDate, text, user.user._id, user.token]);

  useEffect(() => {
    if (adm) {
      getReports();
    } else {
      getReportsAdm();
    }
  }, [adm, getReports, getReportsAdm]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container2}>
        <div className={`${styles.datePicker} ${styles.centered}`}>
          {showTime && (
            <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} showTimeSelect inline />
          )}
        </div>
        <Menu />
        <div className={styles.container3}>
          {render ?
            <Relatorio relatorios={reports} />
            :
            <div>
              <Relatorio relatorios={reports} className="" />
            </div>
          }

          {/* The section below refers to the footer */}
          <div className={styles.container4}>
            <div className={styles.searchContainer}>
              <form className={styles.formContainer}>
                <input
                  className={styles.inputContainer}
                  placeholder="Relatório"
                  value={text}
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.iconBackground} onClick={() => setShowTime(!showTime)}>
                <Calendar className={styles.icon} />
              </div>
              <button
                className={styles.iconBackground}
                onClick={() => {
                  sendReport();
                  setRender(!render)
                  setShowTime(false);
                }}
              >
                <Send className={styles.icon} />
              </button>
            </div>
          </div>
          {/* The section above is the end of the footer */}
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
