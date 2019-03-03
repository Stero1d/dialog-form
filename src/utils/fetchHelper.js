/**
 * Created by smalkov on 02.03.2019.
 */
import axios from "axios";

export const fetchData = (api, data, functionReducer) => {
    //рест запрос axios полностью готов, но для заглушки использую fetch , т.к. он может обратиться к папке с json данными
   /* let d = axios({
        method: "post",
        url: window.location.origin + '/api/' + api,
        data: data,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        }
    })
        .then(response => {
            let { data } = response;
            if(data) {
                setTimeout(() => {
                    functionReducer(data);
                }, 200)
            }
        })
        .catch(error => {
            const {response} = error;
            const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
            setTimeout(() => {
                functionReducer([]);
            }, 3000);
            return {
                errorMessage: errorMessage
            }
        });*/
   let d = fetch(api)
       .then(response => response.json())
       .then(responseJson => {
           let data = responseJson;
           if(data) {
               functionReducer(data);
           }
       })
       .catch((e) => {
           alert("Ошибка загрузки!")
       });
    return (d)

};