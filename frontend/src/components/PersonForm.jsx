import React from 'react'

const PersonForm = ({newName, newNumber, handleNameChange, handlenumberChange, addPerson}) => {
  return (
    <>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>

        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handlenumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm