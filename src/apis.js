import axios from 'axios'
var generated_csrf_token = "{{ csrf_token }}"; 
var config = {

}
export const api =  axios.create({
    baseURL:'http://localhost:8000/api/',
    headers: {'X-CSRFToken': generated_csrf_token},
})

export const auth = axios.create({
    baseURL:'http://localhost:8000/rest-auth/',
    headers: {'X-CSRFToken': generated_csrf_token},
})
// export const URL = 'http://127.0.0.1:8000/'