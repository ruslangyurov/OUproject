import {useCallback, useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'
import {socket} from '../socket.js'
import { set } from 'date-fns';



export const Inbound = () => {
  // By default each bay has no trestles
  const [trestle, setTrestle] = useState([false, false, false, false])
  const [filter, setFilter] = useState(false)
  
  
  

 
  const bayList = useMemo(() => {
    return trestle.map((state, index) => {
      <Bay
        key={index}
        child={index + 1}
        state={state}
        onClick={onBayClick}
        filter={filter}
        index={index}
        sx={{ m: 0 }}
      />
    })
  }, [trestle, filter])
  
  


 
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
  
    

             return (
                <>
                  {!filter && (
                    <Button
                      variant="contained"
                      onClick={() => setFilter(true)}
                      sx={{ position: "absolute", mb: "2px", height: 53, width: 100 }}
                    >
                      Filter
                    </Button>
                  )}
            
                  {bayList}
            
                  {filter && (
                    <Button
                      variant="contained"
                      onClick={() => setFilter(false)}
                      sx={{ ml: 2, height: 53, width: 100 }}
                    >
                      Unfilter
                    </Button>
                  )}
                </>
              );
            };