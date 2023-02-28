import React from 'react'
import CardItem from './CardItem/CardItem'
import style from './MainPage.module.css'
import axios from 'axios'
import { fetchToken } from './../../../RegLog/Auth'



const MainPage = (props) => {

    if (props.Cards.cards.length === 0){

        const requestOptions = {
            method: 'GET',
            headers: {'Authorization' : (`${"Bearer"} ${fetchToken()}`)}
        };
        
        axios.get('https://mtuci-backend.swedencentral.cloudapp.azure.com/services/get_users_requests_admin', requestOptions)
            .then( response => { 
                props.SetCards(response.data.data[0]) }
            )      
    }
   

  let CardElements = props.Cards.cards.map((c) => <CardItem 
  key = {c.id}
  id={c.id} 
  name_service={c.name_service} 
  id_card = {c.id_card} 
  user_name = {c.user_name}
  date_created = {c.date_created}
  status_code = {c.status_code}/>)

    return (
        <div>
            <div className={style.text}>
                Заявки
            </div>
            <div className={style.content}>
                {CardElements}
            </div>

        </div>


    )

}

export default MainPage