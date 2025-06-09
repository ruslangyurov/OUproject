import {useCallback, useEffect, useState, useMemo} from 'react'
import Button from '@mui/material/Button';
import Bay from '../Components/Bay'
import { useSocketContext } from '../Config/SocketContext';


export const Inbound = () => {
  
  const [filter, setFilter] = useState(false)
  const {inbound} = useSocketContext()
  console.log("Bays found:", inbound.length, outbound.length, parking.length);

  


  

  
  const bayList = useMemo(() => {

    const baysToReturn = filter ? inbound.filter((bay) => bay.trestleOn) : inbound
    return baysToReturn.map((bay) => (
    <Bay
      key={bay.bayNumber}
      number={bay.bayNumber.toString()}
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
  

  
    

            










// export const Inbound = () => {
//   // By default each bay has no trestles
//   const [trestle, setTrestle] = useState([false, false, false, false])
//   const [filter, setFilter] = useState(false)

//   const {yard} = useSocketContext()



//   const onBayClick = useCallback((bayIndex) =>  {
//     // iterating through the array
//     setTrestle(previousPositions => previousPositions.map((it, index) => {
//     // if the clicked index matches this one we iterate
//     if (index === bayIndex) { 
//         return !it // just set it's opposite value
//     }
//     return it // otherwise keep it as it is
//     }))
// },[])
  
// const bayList = useMemo(() => {
//   return trestle.map((state, index) => (
//     <Bay
//       key={index}
//       number={index + 1}
//       state={state}
//       onClick={onBayClick}
//       filter={filter}
//       index={index}
      
//     />
//   ));
// }, [trestle, filter]);

  
  

  
    

//              return (
//                 <>
//                   <div className='footer'> 
//                     {!filter && (
//                       <Button
//                         variant="contained"
//                         onClick={() => setFilter(true)}
//                         sx={{ ml: 2, height: 53, width: 100, fontSize:"16px" }}
//                       >
//                         Filter
//                       </Button>
//                     )}
//                   </div> 
//                   <div className='baylist'>
//                     {bayList}
//                   </div>
                    
//                   <div className='footer'> 
//                     {filter && (
//                       <Button
//                         variant="contained"
//                         onClick={() => setFilter(false)}
//                         sx={{ ml: 2, height: 53, width: 100, fontSize:"16px" }}
//                       >
//                         Unfilter
//                       </Button>
                  
//                     )}
//                   </div>
                 
//                 </>
//               );
//             };