import {useState} from 'react';
import './App.css';

const ATMDeposit = ({ onChange, isDeposit, validTransaction, errorMessage}) => {
  console.log(validTransaction);
  let isValid = !validTransaction;
  console.log(isValid);
  const choice = ['Deposit', 'Withdraw'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="atmscreen2">
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" min="0" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={isValid}></input>
    </label>
      <span className='error-text'>{errorMessage}</span>
    </div>
  );
};

const App = () => {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState(""); 
  const [validTransaction, setValidTransaction] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  let status = ` $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(totalState);
    if (Number(event.target.value)<=0) {
      setValidTransaction(false);
      return;
    } else if (atmMode === "Withdraw" && (Number(event.target.value) > totalState)) {
      console.log(atmMode);
      setValidTransaction(false)
      setErrorMessage('Exceeds your total balance');
    } else {
      setValidTransaction(true)
      console.log(`handleChange ${event.target.value}`);
      setDeposit(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    e.preventDefault();
    setAtmMode(e.target.value);
    if (e.target.value === "") {return}
    else if (e.target.value === "Deposit"){
      setIsDeposit(true)
      }
      else {setIsDeposit(false)}
  }

  return (
    <div className="atmback">
    <form onSubmit={handleSubmit}>
    <div className="atmscreen2">
    <span className="title">Select an action above</span>
    <h2 id="total">Account Balance</h2>
      <h3 className="balance">{status}</h3>
      
      </div>
      
      {
      atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction} errorMessage={errorMessage}></ATMDeposit>
      }
    </form>
    <div className="buttonwrapper">
    <button className="balancebut" id="no-selection" value="" onClick={(e) => handleModeSelect(e)}>Balance</button>
    <button className="depositbut" id="deposit-selection" value="Deposit" onClick={(e) => handleModeSelect(e)}>Deposit</button>
    <button className="withdrawbut" id="cashback-selection" value="Withdraw" onClick={(e) => handleModeSelect(e)}>Withdraw</button>
    </div>
    </div>
    
  );
};

export default App;
