import {useCallback, useEffect, useState, useMemo} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'
import { useSocketContext } from '../Config/SocketContext';


export const Inbound = () => {
  
  const [filter, setFilter] = useState(false)
  const {inbound, outbound} = useSocketContext()
  
  const bayList = useMemo(() => {

    const baysToReturn = filter ? inbound.filter((bay) => !bay.trestleOn && bay.trailerNumber !== "Trailer Number") : inbound
    return baysToReturn.map((bay) => (
    <Bay
      key={bay.bayNumber}
      number={bay.bayNumber}
      trailerNumber={bay.trailerNumber}
      stockDelivered={bay.stockDelivered}
      comment={bay.comment}
      fullTrailer={bay.fullTrailer}
      trestleOn = {bay.trestleOn}
      filter={filter}
      index={bay.bayNumber}
    />
  ));
  }, [filter,inbound]);



  return (
    <>
      <div className='footer'> 
        {!filter && (
          <Button
            variant="contained"
            onClick={() => setFilter(true)}
            sx={{ ml: 2, height: 40, width: 100, fontSize:"16px" }}
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
  

  
    

            



