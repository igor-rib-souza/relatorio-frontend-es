import Header from "../../components/header/header";
import Menu from "../../components/menu/menu";
import Footer from "../../components/footer/footer";
import styles from "./page.module.css";
import Relatorio from "../../components/relatorios/relatorios";
import api from "../../services/api"

export default function Relatorios(){

    const mock = {
        "relatorios": [
          {
            "id": 1,
            "user": "dada@dada.com",
            "date": "12/32/9999",
            "startTime": "99:99",
            "endTime": "12:34",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "tags": [
              "xxxxxx","wadwad","dasdas"
            ]
          },
          {
            "id": 2,
            "user": "dsadsada@eqweqw.com",
            "date": "40/12/1400",
            "startTime": "31:12",
            "endTime": "13:15",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "tags": [
              "eqewqewqe"
            ]
          },
          {
            "id": 3,
            "user": "dsadasd@eqweqweqw.com",
            "date": "20/02/2004",
            "startTime": "16:40",
            "endTime": "18:30",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "tags": [
              "xzczxczx"
         ]
      }
      ]
      }

    return(
        <div className={styles.container}>
            <Header/>
            <div className={styles.container2}>
                <div>
                    <Menu/>
                </div>
                <div className={styles.container3}>
                    <Relatorio relatorios={mock}/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}