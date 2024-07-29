
import {useState,useEffect, useRef} from 'react'
import Bay from '../Components/Bay'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const Outbound = () => {
    const [category, setCategory] = useState("bays")
    const bayList = []
    for (let j=5;j<10; j++) {
              bayList.push(<Bay key = {j} child = {j}/>)
             }

    const [filteredBays, setFilteredBays] = useState([])

    const filterBays = () => {
        const n = bayList.filter(bay => {return bay.trestleRef.checked === false})
        }
    

   if (category.current === "bays") {
    return (
      <>
        {bayList}
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
      )}

}