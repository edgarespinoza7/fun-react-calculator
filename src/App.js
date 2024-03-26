import { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';
import Screen from './components/Screen';
import Button from './components/Button';
import Clear from './components/Clear';
import Footer from './components/Footer'


function App() {

  const [digit, setDigit] = useState([]);

  const addInput = value => {
    setDigit(digit + value);
  };

  const [funFact, setFunFact] = useState([]);

  async function trivia() {

    const b = evaluate(digit);

    if (Number.isInteger(b)) {
      const response = await fetch(`http://numbersapi.com/${b}?json`);
      const funFact = await response.json();
      setFunFact([funFact.text]);

    } else {
      const response = await fetch("http://numbersapi.com/random?json");
      const funFact = await response.json();
      setFunFact([funFact.text]);

    }
  }

  const calcResult = () => {
    if (digit) {
      if (Number.isInteger(evaluate(digit))) {
        setDigit(evaluate(digit));
        trivia();
      } else {
        setDigit(evaluate(digit).toFixed(3));
        trivia();
      }
    } else {
      return null;
    }

  };

  const isNotInt = `${digit} is a boring number 🥱🥱🥱\nBut here is another interesting fact: ${funFact}`;

  return (
      <div className="App">
      {/**Title and Info */}
        <div className='text-container'>
          <h1 className='title'>Fun-facts Calculator</h1>
          <hr />
          <p>Every time you complete an operation you might discover an interesting fact about numbers.</p>
        </div>
        {/* Calculator */}
        <div className="calc-container">
          <Screen input={digit} />

          <div className="row">
            <Button handleClick={addInput}>1</Button>
            <Button handleClick={addInput}>2</Button>
            <Button handleClick={addInput}>3</Button>
            <Button handleClick={addInput}>+</Button>
          </div>

          <div className="row">
            <Button handleClick={addInput}>4</Button>
            <Button handleClick={addInput}>5</Button>
            <Button handleClick={addInput}>6</Button>
            <Button handleClick={addInput}>-</Button>
          </div>

          <div className="row">
            <Button handleClick={addInput}>7</Button>
            <Button handleClick={addInput}>8</Button>
            <Button handleClick={addInput}>9</Button>
            <Button handleClick={addInput}>*</Button>
          </div>

          <div className="row">
            <Button handleClick={calcResult}>=</Button>
            <Button handleClick={addInput}>0</Button>
            <Button handleClick={addInput}>.</Button>
            <Button handleClick={addInput}>/</Button>
          </div>

          <div className="row">
            <Clear
              handleClear={() => {
                setDigit('');
                setFunFact([]);
              }}>
              Clear
            </Clear>
          </div>
        </div>
        {/* Message */}
        <div className='fun-fact'>
          <div className={funFact.length === 0 ? 'hidden' : 'shown'}>
            <p>{Number.isInteger(digit) ? `${funFact}` : `${isNotInt}`}</p>
          </div>
        </div>
        <Footer />
      </div>
      
  );
}

export default App;
