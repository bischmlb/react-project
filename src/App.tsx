import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Components/Container';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];


function App() {
  
  return (
    <div className="App">
      <Container >
      </Container>

    </div>
  );
}




export default App;
