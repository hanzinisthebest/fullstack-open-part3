const Notification = ({ message,error }) => {
    if (message === null) {
      return null
    }

    if(error) { 
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  
    return (

      <h1>{message}</h1>
  
    )
  }
  
  export default Notification