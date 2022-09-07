import { useState } from 'react';
import './App.css';

function Bar(props){
  const {idx, number, percent, numberOfDice} = props;

  return (
    <div className='bar-wrapper'>
      <p className='label'>{idx + Number(numberOfDice)}</p>
      <div className='bar' style={{height: percent + "%"}} />
      <p className='total'>{number}</p>
    </div>
  );
}

function App() {
  let [numberOfDice, setNumberOfDice] = useState(2);
  let [numberOfRolls, setNumberOfRolls] = useState(100);
  let [rolls, setRolls] = useState(Array(numberOfDice*6 - (numberOfDice-1)).fill(0));

  const rollDice = () => {
    let newRolls = [...rolls];

    for (let i=0; i < numberOfRolls; i++){
      let sum = 0;

      for (let r=0; r < numberOfDice; r++){
        sum = sum + Math.floor(Math.random()*6 + 1) - 1;
      }

      newRolls[sum]++;
    }
    setRolls(newRolls);
  }


  const handleNumberOfDiceChange = (e) => {
    const newValue = e.currentTarget.value;

    if (newValue > 10) { newValue = 10 }
    
    setNumberOfDice(newValue);
    setRolls(Array(newValue*6 - (newValue-1)).fill(0));
  }
  const handleNumberOfRollsChange = (e) => {
    const newValue = e.currentTarget.value;

    if (newValue > 999999) { newValue = 999999 }

    setNumberOfRolls(newValue);
  }

  return (
    <div className='VStack Center'>

      <div className="HStack chart">
        { rolls.map((number, idx) => {
            const percent = (Math.max(...rolls) == 0) ? 0 : number / Math.max(...rolls) * 80;
            return <Bar key={idx} number={number} idx={idx} percent={percent} numberOfDice={numberOfDice} />
          }) 
        }
      </div>


      <div id="options" className='HStack Center'>

        <div className='VStack'>
          <p># of Dice</p>
          <input type="number" id="numberOfDice-button" placeholder="# of dice" value={numberOfDice} min="0" max="10" onChange={handleNumberOfDiceChange}></input>
        </div>

        <div className='VStack'>
          <p># of Rolls</p>
          <input type="number" id="numberOfRolls-button" placeholder="# of rolls" value={numberOfRolls} min="1" max="999999" onChange={handleNumberOfRollsChange}></input>
        </div>

      </div>
      <button id="roll-button" onClick={rollDice}>Roll Dice</button>

    </div>
  );
}

export default App;
