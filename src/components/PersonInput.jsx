export const PersonInput = ({ type, value, handler }) => {
	return (
		<div>
			{type}: <input value={value} onChange={(e) => handler(e.target.value)} />
		</div>
	)
}
