import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const persons = await personService.getAll();
      setPersons(persons);
    };
    fetchData();
  }, []);

  const updatePerson = async (existing) => {
    const action = window.confirm(
      `${newName} is already in the phonebook, replace the old number with a new one?`
    );
    if (action) {
      const update = { name: newName, number: newNumber };
      const updatedPerson = await personService.update(existing.id, update);
      setPersons(
        persons.map((person) =>
          person.id !== existing.id ? person : updatedPerson
        )
      );
      setNewName("");
      setNewNumber("");
    }
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const existing = persons.find((person) => person.name === newName);
    if (existing !== undefined) {
      updatePerson(existing);
      return;
    }
    const person = { name: newName, number: newNumber };
    const newPerson = await personService.create(person);
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = async (id) => {
    await personService.remove(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a Person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
