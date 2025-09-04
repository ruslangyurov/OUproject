import {useState,useEffect, useRef, useMemo} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSocketContext } from '../Config/SocketContext';


export const Outbound = () => {
  const [filter, setFilter] = useState(false)
  const {outbound} = useSocketContext()


  const bayList = useMemo(() => {
    const baysToReturn = filter ? outbound.filter((bay) => bay.trestleOn === false):outbound
    return baysToReturn.map((bay) => (
      <Bay 
      key={bay.bayNumber}
      number={bay.bayNumber.toString()}
      trailerNumber={bay.trailerNumber}
      stockDelivered={bay.stockDelivered}
      comment={bay.comment}
      fullTrailer={bay.fullTrailer}
      trestleOn = {bay.trestleOn}
      filter={filter}
      index={bay.bayNumber}
    />
  ));
  }, [filter,outbound]);

  return (
    <>
      <div className='footer'> 
        {!filter && (
          <Button
            variant="contained"
            onClick={() => setFilter(true)}
            sx={{ ml: 2, height: 53, width: 100, fontSize:"16px" }}
          >
            Filter
          </Button>
        )}
      </div> 
      <div className='baylist'>
        {bayList}
      </div>
        
      <div className='footer'> 
        {filter && (
          <Button
            variant="contained"
            onClick={() => setFilter(false)}
            sx={{ ml: 2, height: 53, width: 100, fontSize:"16px" }}
          >
            Unfilter
          </Button>
      
        )}
      </div>
     
    </>
  );
};
   


 
  
  

 
  
 
    
  
  
      
  
 
   

     
    
    

  
