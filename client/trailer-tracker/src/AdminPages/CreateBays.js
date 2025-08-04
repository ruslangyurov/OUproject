import * as React from 'react'
import { useState } from 'react';
import axiosInstance from "../apiAxios/axios"; 

export const CreateBays = () => {
  const [number, setNumber] = useState('');
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1);
  const [resMsg,setResMsg] = useState('');
  
   
  const SINGLE_URL = 'yard'
  const MULTIPLE_URL = 'yard/create-bays'

  const handleSubmitSingle = async(e) => {
    e.preventDefault();
    
    await axiosInstance.post(SINGLE_URL, { bayNumber: Number(number) }).then(() => setResMsg("Bay successfully created"))
    .catch((err) => setResMsg(err.response?.data?.message || "An error occurred"));
  }

  const handleSubmitMultiple = async(e) => {
    e.preventDefault();
    await axiosInstance.post(MULTIPLE_URL, {low:low,high:high}).then(()=> setResMsg("Successfully created."))
    .catch((error) => setResMsg(error.response?.data?.message) || "Unknown error occured")
   
  };

  return (
    <> 
      {resMsg && (
      <div className="resMsg">
        {resMsg}
      </div>
      )}
      <div className="newUser_container">

        <form className='form-group' onSubmit={handleSubmitSingle}>
          <label htmlFor="singleBay">Create single bay</label>
          <input
            id="singleBay"
            className="newUser_container_input"
            type="number"
            value={number}
            step="1"
            min="1"
            onChange={(e) => {
              const value = e.target.value;

              // Allow empty value so user can delete/backspace
              if (value === '') {
                setNumber('');
                return;
              }


              const num = parseInt(value, 10);

              // Only allow numbers 1 and above
              if (num >= 1) {
                setNumber(value);
              }
            }}
            onClick={() => {
              setResMsg(null)
            }}
            onKeyDown={(e) => {
              // Prevent typing invalid characters like '.', '-', 'e' (common in number inputs)
              if (['-', '+', 'e', '.'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <div>
            <input type="submit" className="newUser_submit_button" />
          </div>
        </form>

        <div>
          <label>Create multiple bays</label>
        </div>

        <form className="form-group" onSubmit={handleSubmitMultiple}>
          <label htmlFor="lowBay">From:</label>
          <input 
            className="newUser_container_input"
            id="lowBay"
            type="number" 
            value={low}
            min = "1" 
            onChange={(e) => {
              const value = e.target.value;

              // Allow empty value so user can delete/backspace
              if (value === '') {
                setLow('');
                return;
              }

              const num = parseInt(value, 10);

              // Only allow numbers 1 and above
              if (num >= 1) {
                setLow(value);
              }
            }}
            onClick={() => {
             setResMsg(null)
            }}
            onKeyDown={(e) => {
              // Prevent typing invalid characters like '.', '-', 'e' (common in number inputs)
              if (['-', '+', 'e', '.'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />

          <label htmlFor="highBay">To:</label>
          <input 
            className="newUser_container_input"
            id="highBay"
            type="number" 
            value={high} 
            onChange={(e) => {
              const value = e.target.value;

              // Allow empty value so user can delete/backspace
              if (value === '') {
                setHigh('');
                return;
              }

              const num = parseInt(value, 10);

              // Only allow numbers 1 and above
              if (num >= 1) {
                setHigh(value);
              }
            }}
            onClick={() => {
              setResMsg(null)
            }}
            onKeyDown={(e) => {
              // Prevent typing invalid characters like '.', '-', 'e' (common in number inputs)
              if (['-', '+', 'e', '.'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />

          <div>
            <input type="submit" className="newUser_submit_button" />
          </div>
        </form>

      </div>
    </>
  );
};
