import { useEffect, useState } from 'react'
import { Person } from './components/Person'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import guideService from './services/guideService'
import { Notification } from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [message, setMessage] = useState(null)

	const filtredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)

	const handleDelete = (id) => {
		const oldName = persons.find((person) => person.id === id).name
		guideService
			.erase(id)
			.then(() => {
				setPersons(persons.filter((person) => person.id !== id))
			})
			.then(() => {
				setMessage({ type: 'error', message: `Deleted ${oldName}` })
				setTimeout(() => {
					setMessage(null)
				}, 3000)
			})
			.catch((err) => {
				if (err.request.status === 404) {
					setMessage({
						type: 'error',
						message: `Information of ${oldName} has already been removed from server`,
					})
				} else {
					setMessage({
						type: 'error',
						message: `Sorry, an internal error ocurred`,
					})
				}
				setTimeout(() => {
					setMessage(null)
				}, 3000)
			})
	}

	useEffect(() => {
		guideService.getAll().then((data) => setPersons(data))
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification {...message} />
			<Filter filter={filter} setFilter={setFilter} />
			<h3>add a new</h3>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setMessage={setMessage}
			/>
			<h3>Numbers</h3>
			{filtredPersons.map((person) => (
				<Person key={person.name} person={person} handleDelete={handleDelete} />
			))}
		</div>
	)
}

export default App
