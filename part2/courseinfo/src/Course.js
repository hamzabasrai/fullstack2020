import React from 'react'

const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };
  
  const Total = ({ parts }) => {
    const sum = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);
    return <b>Total of {sum} exercises</b>;
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </>
    );
  };
  
  const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

  export default Course