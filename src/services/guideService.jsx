import axios from 'axios'
const baseUrl = 'https://phonebook-backend-wgw8.onrender.com/api/persons'

const getAll = () => axios.get(baseUrl).then((res) => res.data)

const create = (newPerson) =>
	axios.post(baseUrl, newPerson).then((res) => res.data)

const erase = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newPerson) =>
	axios.put(`${baseUrl}/${id}`, newPerson).then((res) => res.data)

export default { getAll, create, erase, update }
