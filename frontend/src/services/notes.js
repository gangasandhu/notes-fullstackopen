import axios from 'axios'

const baseUrl = "/api/notes"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (noteObject) => {
    const request = axios.post(baseUrl, noteObject)
    return request.then(response => response.data)
}

const update = (id, noteObject) => {
    const request =  axios.put(`${baseUrl}/${id}`, noteObject)
    return request.then(response => response.data)
}

export default {getAll, create, update}