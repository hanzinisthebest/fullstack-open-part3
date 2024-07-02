import React from 'react'

const Numbers = ({deletePerson,persons, filter}) => {
  return (
    <>
    <h2>Numbers</h2>
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.id}>{person.name} {person.number}  
        <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>)}</ul>
    </>
  )
}

export default Numbers