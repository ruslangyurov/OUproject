import {useCallback, useEffect, useState, useMemo} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'

import { set } from 'date-fns';



export const Inbound = () => {
  // By default each bay has no trestles
  const [trestle, setTrestle] = useState([false, false, false, false])
  const [filter, setFilter] = useState(false)


  const onBayClick = useCallback((bayIndex) =>  {
    // iterating through the array
    setTrestle(previousPositions => previousPositions.map((it, index) => {
    // if the clicked index matches this one we iterate
    if (index === bayIndex) { 
        return !it // just set it's opposite value
    }
    return it // otherwise keep it as it is
    }))
},[])
  
const bayList = useMemo(() => {
  return trestle.map((state, index) => (
    <Bay
      key={index}
      child={index + 1}
      state={state}
      onClick={onBayClick}
      filter={filter}
      index={index}
      
    />
  ));
}, [trestle, filter]);

  
  

  
    

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