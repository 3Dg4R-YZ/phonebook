export const Person = ({ person, handleDelete }) => {
	const { name, number, id } = person

	return (
		<p>
			{name} {number}{' '}
			<button
				onClick={() => {
					if (window.confirm(`Delete ${name} ?`)) handleDelete(id)
				}}
			>
				delete
			</button>
		</p>
	)
}
