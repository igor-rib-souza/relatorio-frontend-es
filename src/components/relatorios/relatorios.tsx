import styles from "./page.module.css";
import { ArrowRight, Clock } from "lucide-react";

export default function Relatorios(relatorios: any) {
  const data = relatorios["relatorios"]["reports"];



  return (
    <div className={styles.container}>
      <div className={styles.headerRelatorio}>
        <div className={styles.containerHeaderData}>
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
