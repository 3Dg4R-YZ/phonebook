export const Notification = ({ type, message }) => {
	if (message === null || message === undefined) return
	return <div className={type === 'done' ? 'done' : 'error'}>{message}</div>
}
