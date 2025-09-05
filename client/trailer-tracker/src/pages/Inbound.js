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
          sx={{
          ml: 2,
          px: { xs: 2, sm: 3, md: 4 },  // horizontal padding changes with screen size
          py: { xs: 1, sm: 1.5, md: 2 }, // vertical padding
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          textTransform: "none" // optional: keeps text normal instead of ALL CAPS
            }}
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
            onClick={() => setFilter(true)}
            sx={{
              ml: 2,
              px: { xs: 2, sm: 3, md: 4 },  // horizontal padding changes with screen size
              py: { xs: 1, sm: 1.5, md: 2 }, // vertical padding
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              textTransform: "none" // optional: keeps text normal instead of ALL CAPS
            }}
          >
            Filter
        </Button>

      
        )}
      </div>
     
    </>
  );
};
  

  
    

            



