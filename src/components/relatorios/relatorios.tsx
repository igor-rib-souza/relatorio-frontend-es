import styles from "./page.module.css";
import { ArrowRight, Clock } from "lucide-react";

export default function Relatorios(relatorios: any) {
  const data = relatorios["relatorios"]["relatorios"];

  return (
    <div className={styles.container}>
      <div className={styles.headerRelatorio}>
        <div className={styles.containerHeaderData}>
          <p className={styles.date}>{data[0]["date"]}</p>
          <ArrowRight className={styles.arrow} size={15} />
          <p className={styles.date}>{data[data.length - 1]["date"]}</p>
        </div>
      </div>
      <div className={styles.containerRelatorio}>
        {data.map((relatorio: any, index: number) => (
          <div key={index} className={styles.relatorio}>
            <div className={styles.dateRelatorio}>
              <p className={styles.textDate}>{relatorio.date}</p>
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
                {data.map((tags: any, index: number) => (
                  <p key={index}>{relatorio["tags"][index]}</p>
                ))}
              </div>
              <div className={styles.containerTextRelatorio}>
                <p className={styles.text}>{relatorio["text"]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
