import {useState,useEffect} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const Parking = () => {
  const [category, setCategory] = useState("bays")
  const [trestle, setTrestle] = useState([false,false,false,false])

  useEffect(() => {
    filterBays()
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
  for (let i = 0; i < trestle.length; i++) {
    myBays.push(<Bay key = {i} child = {i+1} index = {i}  state = {trestle[i]} onClick = {onBayClick}/>)
  }
  const [filteredBays, setFilteredBays] = useState(myBays)

  
  
  const filterBays = () => {
    setFilteredBays(myBays.filter(bay => {
      return bay.trestle === false
    }))
    
  }
  
  
  
  if (category === "bays") {
    return (
      <>
         {myBays}
         <Button variant="contained" endIcon={<SendIcon />} onClick={() => setCategory("")} sx={{ml:2,height:53, width:100}}>Filter</Button>
      
      </>
     
    )
  } else {
    return (
      filteredBays.length
      )
    
  }
}
  
