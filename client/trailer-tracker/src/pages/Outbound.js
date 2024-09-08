import {useState,useEffect, useRef} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export const Outbound = () => {
  const category = useRef("bays")
  const [trestle, setTrestle] = useState([false,false,false,false])

  useEffect(() => {
    filterBays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trestle])
  
  const onBayClick = (bayIndex) => {
    setTrestle(trestle => trestle.map((it, index) => { // iterating through the array
    if (index === bayIndex) { // if the clicked index matches this one we iterate
        return !it // just set it's opposite value
    }
    return it // otherwise keep it as it is
    }))
}
  
  const myBays = []
  for (let i = 4; i < 4 + trestle.length; i++) {
    myBays.push(<Bay key = {i} child = {i+1} index = {i}  state = {trestle[i]} onClick = {onBayClick}/>)
  }
  const [filteredBays, setFilteredBays] = useState([])

 
  
  const filterBays = () => {
        const n = myBays.map((bay,index) => {
          if (trestle[index] === false) {
            return myBays[index]
          }
        } )
        setFilteredBays(n)
       
      }
    
  
  
      
  
 
   if (category.current === "bays") {
    return (
      <>
        {myBays}
        <Button variant="contained" endIcon={<SendIcon />} onClick={() => {category.current = ""}} sx={{ml:2,height:53, width:100}}>Submit</Button>
      </>
    )
    
   } else {
    return (
      <>
        {filteredBays.map(bay => (
         <Bay/>
      ))}
      </>
      )

     
    
    }}

  
