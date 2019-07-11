import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = (props) => {
	var filteredNames = props.persons
	if(props.showResults){
		filteredNames = props.persons.filter(person => person.name.toLowerCase().includes(props.showResults.toLowerCase()))
	}
	const disp = () => filteredNames.map(person=>
			<li key={person.name}> {person.name} {person.number}</li>
	)
	return (

		<ul>{disp()}</ul>
	)

}

const Filter = (props) => {
	return (
		<div>
		  filter shown with <input
			value={props.showResults}
			onChange = {props.filterChange}
		  />
	  </div>
	)
}

const PersonForm = (props) => {
	return (
		<div>
			<form onSubmit={props.addDetails}>
				<div>
				name: <input
						value={props.newName}
						onChange={props.handleChange} 
						/> <br/>
				number: <input 
						value={props.newNumber}
						onChange = {props.handleNumberChange}
						/>
				</div>
				
				<div>
					<button type="submit">add</button>
				</div>
     		</form>
		</div>
	)
}

const App = () => {
	const [ persons, setPersons] = useState([])
	useEffect(()=> {
		console.log('effect')
		axios.get('http://localhost:3001/persons').then(response=>{
			console.log('promise fulfilled')
			console.log(typeof response.data)
			setPersons(response.data)
		})
	},[])
   
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNumber] = useState('')
  const [showResults, setResults] = useState('')
 
  const addDetails = (event) => {
	  event.preventDefault()
	//   console.log(event.target)
	
		// console.log(persons[1]);

		if(persons.findIndex(person => person.name === newName) > -1){
			alert(newName + ' is already in the phonebook')
		}
		else{
			const obj = {
				name: newName,
				number: newNumber
			}
			// console.log(persons)
			// console.log(obj)		
			setPersons(persons.concat(obj))
			setNewName(' ')
			setNumber(' ')
		}
	
  }
  const handleChange = (event) => {
	//   console.log(event.target.value)
	  setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
	//   console.log(event.target.value)
	  setNumber(event.target.value)
  }
  const filterChange = (event) => {
	  setResults(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter showResults={showResults} filterChange={filterChange} />
	  <h2>add a new </h2>
      <PersonForm addDetails={addDetails} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} showResults={showResults} />
    </div>
  )
}

export default App