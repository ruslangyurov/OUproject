import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Typography,
    Box

} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState } from "react"
import axiosInstance from "../apiAxios/axios"


export default function EditUserEmployment() {

    const [position, setPosition] = useState("")
    const [department, setDepartment] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const USER_URL = "/user/profile/employment"

    const employmentHistory = {
        newPosition:position,
        newDepartment:department,
        newStartDate:new Date(startDate),
        newEndDate:new Date(endDate)
    }
    const handleUserEmploymentUpdate = (e) => {
        e.preventDefault()
        axiosInstance.patch(USER_URL, {employmentHistory:employmentHistory}).catch((error) => {
            setErrMsg(error.response?.data?.message)
        })
    }
   
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                
                <Typography><strong>Edit</strong></Typography>
            </AccordionSummary>
            <Box sx={{color:"red", fontSize:"1em", m:"2px 2px"}}>
                {errMsg}
            </Box>
            <AccordionDetails>
                
                    <TextField 
                       label="Position"
                       value = {position}
                       onChange={(e) => setPosition(e.target.value)}
                       fullWidth
                    />
                    <TextField
                       label="Department"
                       value={department}
                       onChange={(e) => setDepartment(e.target.value)}
                       fullWidth
                    />
                    <TextField
                       label="Start Date"
                       value={startDate}
                       onChange={(e) => setStartDate(e.target.value)}
                       fullWidth
                    />
                    <TextField
                       label="End Date"
                       value={endDate}
                       onChange={(e) => setEndDate(e.target.value)}
                       fullWidth
                    />
                    <Button type="submit" variant="contained" onClick={handleUserEmploymentUpdate} sx={{mt:2}}>Save</Button>
               
            </AccordionDetails>
        </Accordion>
    )
}



    
