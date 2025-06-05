import * as React from 'react'
import { useState } from 'react';

export const CreateBays = () => {
  const [number, setNumber] = useState('');
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');
   
  const SINGLE_URL = 'yard'
  const MULTIPLE_URL = 'yard/create-bays'

  const handleSubmitSingle = async(e) => {
    e.preventDefault();
    
  };

  const handleSubmitMultiple = async(e) => {
    e.preventDefault();
   
  };

  return (
    <> 
      <div className="newUser_container">

        <form onSubmit={handleSubmitSingle}>
          <label htmlFor="singleBay">Create single bay</label>
          <input
            id="singleBay"
            className="newUser_container_input"
            type="number"
            value={number}
            step="1"
            min="1"
            onChange={(e) => setNumber(e.target.value)}
            onClick={() => { setErrMsg(""); setSuccess(""); }}
          />
          <div>
            <input type="submit" className="newUser_submit_button" />
          </div>
        </form>

        <form className="form-group" onSubmit={handleSubmitMultiple}>
          <label htmlFor="lowBay">From:</label>
          <input 
            className="newUser_container_input"
            id="lowBay"
            type="number" 
            value={low} 
            onChange={(e) => setLow(e.target.value)} 
          />

          <label htmlFor="highBay">To:</label>
          <input 
            className="newUser_container_input"
            id="highBay"
            type="number" 
            value={high} 
            onChange={(e) => setHigh(e.target.value)} 
          />

          <div>
            <input type="submit" className="newUser_submit_button" />
          </div>
        </form>

      </div>
    </>
  );
};
