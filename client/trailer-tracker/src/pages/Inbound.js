import {useState} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'



export const Inbound = () => {
  const [trestle, setTrestle] = useState([false, false, false, false])
  const [filter, setFilter] = useState(false)
 
  function onBayClick (bayIndex) {
        setTrestle(previousPositions => previousPositions.map((it, index) => { // iterating through the array
        if (index === bayIndex) { // if the clicked index matches this one we iterate
            return !it // just set it's opposite value
        }
        return it // otherwise keep it as it is
        }))
  }
  
    const bayList = []
    for (let j=0;j<trestle.length; j++) {
              bayList.push(<Bay key = {j} child = {j+1} state = {trestle[j]} onClick = {onBayClick} filter = {filter} index = {j} sx={{m:0}}/>)
             }

    if (filter === false) {
        return (
            <>
                 
                  {bayList}
                  <Button variant="contained" onClick={() => {setFilter(true)}} sx={{ml:2,height:53, width:100}}>Filter</Button>
            </>
           
            )
    } else {
        return (
            <>
                 
                  {bayList}
                  <Button variant="contained" onClick={() => {setFilter(false)}} sx={{ml:2,height:53, width:100}}>Unfilter</Button>
            </>
           
            )
    }
    
}