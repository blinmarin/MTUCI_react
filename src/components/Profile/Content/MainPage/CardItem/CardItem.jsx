import React from "react"
import style from "./CardItem.module.css"

const ContentItem = (props) => {

    return(
    <div className={style.contentItem}>
        <div className={style.firstItem}>
        {props.name_service}
        </div>
        <div className={style.item}>
        {props.id_card} - {props.user_name}
        </div>
        <div className={style.item}>
        Заявка: {props.id.substr(props.id.length - 5)}
        </div>
        <div className={style.item}>
        Дата создания заявки: {props.date_created.substring(8,10)}.{props.date_created.substring(5,7)}.{props.date_created.substring(0,4)}
        </div>
        <div className={props.status_code === '0' ? style.figureBlue : style.figureGreen}></div>
        <button className={style.button}>Открыть заявку</button>


    </div>
    )
}

export default ContentItem