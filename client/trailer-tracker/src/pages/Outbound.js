import {useState,useEffect, useRef} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSocketContext } from '../Config/SocketContext';


export const Outbound = () => {
  const yard = useSocketContext()


 return (
    <div>
      <h1>Outbound</h1>
      <div className="yard">
        {yard.map((bay) => (
          <Bay key={bay.bayNumber} number={bay.bayNumber} trestleOn={bay.trestleOn} />
        ))}
      </div>
    </div>
  )

}
  
  

 
  
 
    
  
  
      
  
 
   

     
    
    

  
