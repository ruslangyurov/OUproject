import {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'
import {socket} from '../socket.js'
import { set } from 'date-fns';



export const Inbound = () => {
  // By default each bay has no trestles
  const [trestle, setTrestle] = useState([false, false, false, false])
  const [filter, setFilter] = useState(false)
  const [formData, setFormData] = useState({
      trailerNumber: "Trailer Number",
      stockDelivered: "Stock Delivered",
      fullTrailer: '',
      comment: '',
    });
  
  const setBayData = () => {

  }

 
  const bayList = useMemo(() => {
    trestle.map((state, index) => {
      <Bay
        key={j}
        formData={formData} // Pass formData
        setFormData={setFormData} // Pass setFormData
        child={j + 1}
        state={state}
        onClick={onBayClick}
        filter={filter}
        index={j}
        sx={{ m: 0 }}
      />
    })
  }, [trestle, filter, formData])
  
  


 
  function onBayClick (bayIndex) {
        // iterating through the array
        setTrestle(previousPositions => previousPositions.map((it, index) => {
        // if the clicked index matches this one we iterate
        if (index === bayIndex) { 
            return !it // just set it's opposite value
        }
        return it // otherwise keep it as it is
        }))
  }
  
    

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