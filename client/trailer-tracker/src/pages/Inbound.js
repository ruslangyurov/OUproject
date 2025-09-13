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
      updatedBy = {bay.updatedBy}
      updatedAt = {bay.updatedAT}
      filter={filter}
      index={bay.bayNumber}
    />
  ));
  }, [filter,inbound]);



  return (
    <>
      <div style = {{marginTop:"60px"}}>
        {bayList}
      </div>
      <div className="footer">
        <Button
          variant="contained"
          size="small"
          onClick={() => setFilter(!filter)}
          sx={{
            ml: 1,
            fontSize: { xs: "11px", sm: "12px" },
            minWidth: "80px",
            height: "28px",
            textTransform: "none",
          }}
        >
          {filter ? "Unfilter" : "Filter"}
        </Button>
      </div>

     
    </>
  );
};
  

  
    

            



