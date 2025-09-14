import {useCallback, useEffect, useState, useMemo} from 'react'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BayForm from '../Components/BayForm';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useSocketContext } from '../Config/SocketContext';


export const Inbound = () => {
  
  const [filter, setFilter] = useState(false)
  const {inbound, setInbound} = useSocketContext()
  const [trestle, setTrestle] = useState(false)

  const baysToReturn = filter 
  ? inbound.filter(bay => !bay.trestleOn && bay.trailerNumber !== "Trailer Number")
  : inbound;

  return (
  <> 
    {baysToReturn.map(bay => (
      <Box sx={{ width: '100%', mb: 2. mt:"60px" }} key={bay.bayNumber}>
        <Accordion disableGutters sx={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${bay.bayNumber}-content`}
            id={`panel-${bay.bayNumber}-header`}
            sx={{bgcolor: '#e3f2fd',alignItems: 'flex-start',gap: 1,px: 2,py: 1,}}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                fontWeight: 'bold',
              }}
            >
              {bay.bayNumber}
            </Typography>

            <BayForm
              formData={bay}
              setFormData={(updated) =>
                setInbound(prev =>prev.map(b =>b.bayNumber === bay.bayNumber ? { ...b, ...updated } : b))
              }
              trestle = {trestle}
              setTrestle = {setTrestle}
            />
          </AccordionSummary>
        </Accordion>
      </Box>

))};
    
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
  )
}

  
//   const bayList = () => {

//     const baysToReturn = filter ? inbound.filter((bay) => !bay.trestleOn && bay.trailerNumber !== "Trailer Number") : inbound
//     return baysToReturn.map((bay) => (
//     <Bay
//       key={bay.bayNumber}
//       number={bay.bayNumber}
//       trailerNumber={bay.trailerNumber}
//       stockDelivered={bay.stockDelivered}
//       comment={bay.comment}
//       fullTrailer={bay.fullTrailer}
//       trestleOn = {bay.trestleOn}
//       updatedBy = {bay.updatedBy}
//       updatedAt = {bay.updatedAT}
//       filter={filter}
//       index={bay.bayNumber}
//     />
//   ));
//   };



//   return (
//     <>
//       <div style = {{marginTop:"60px"}}>
//         {bayList()}
//       </div>
//       <div className="footer">
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => setFilter(!filter)}
//           sx={{
//             ml: 1,
//             fontSize: { xs: "11px", sm: "12px" },
//             minWidth: "80px",
//             height: "28px",
//             textTransform: "none",
//           }}
//         >
//           {filter ? "Unfilter" : "Filter"}
//         </Button>
//       </div>

     
//     </>
//   );
// };
  

  
    

            



