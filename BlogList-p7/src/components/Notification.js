import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  console.log('notification')
  console.log(notification)


  if (!notification) return null

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div>
      {(notification.message &&
        <Alert variant="success">
          {notification.message}
        </Alert>
      )}
    </div>
  )
}

export default Notification