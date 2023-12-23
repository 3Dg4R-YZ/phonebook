import { useState } from 'react'
import { PersonInput } from './PersonInput'
import guideService from '../services/guideService'

export const PersonForm = ({ persons, setPersons, setMessage }) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = { name: newName.trim(), number: newNumber }
		const oldPerson = persons.find(
			(person) => person.name.toLowerCase() === newName.trim().toLowerCase()
		)
		if (oldPerson) {
			if (
				!window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			)
				return
			guideService
				.update(oldPerson.id, newPerson)
				.then((res) => {
					setPersons(
						persons.map((person) => (person.id !== oldPerson.id ? person : res))
					)
				})
				.then(() => {
					setMessage({ type: 'done', message: `Updated ${newName}` })
					setTimeout(() => {
						setMessage(null)
					}, 3000)
				})
			return
		}
		guideService
			.create(newPerson)
			.then((data) => {
				setPersons([...persons, data])
				setNewName('')
				setNewNumber('')
			})
			.then(() => {
				setMessage({ type: 'done', message: `Added ${newName}` })
				setTimeout(() => {
					setMessage(null)
				}, 3000)
			})
	}
	return (
		<form onSubmit={handleSubmit}>
			<PersonInput type={'name'} value={newName} handler={setNewName} />
			<PersonInput type={'number'} value={newNumber} handler={setNewNumber} />
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}
