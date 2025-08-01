import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Typography

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

    const USER_URL = "/user"

    const employmentHistory = {
        position:position,
        department:department,
        startDate:new Date(startDate),
        endDate:new Date(endDate)
    }
    const handleUserEmploymentUpdate = async (e) => {
        e.preventDefault()
        await axiosInstance.patch(USER_URL, {employmentHistory:employmentHistory}).catch((error) => {
            setErrMsg(error.response.data.message)
        })
    }
   
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                
                <Typography><strong>Edit</strong></Typography>
            </AccordionSummary>
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



    
