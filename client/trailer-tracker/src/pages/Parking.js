import {useState} from 'react'
import Bay from '../Components/Bay'

export const Parking = () => {

  const [trestle, setTrestle] = useState([false,false,false,false])
  
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
    myBays.push(<Bay key = {i} child = {i}  state = {trestle[i]} onClick = {onBayClick}/>)
  }
  const [filteredBays, setFilteredBays] = useState(myBays)
  const filterBays = () => {
    setFilteredBays(myBays.filter(bay => {
      return bay.trestle === false
    }))
  }
  
  
  
  return (
    <>
      
      {myBays}
     
      
  
    </>
  )
}