
import {Link} from "react-router-dom"
import Button from '@mui/material/Button';

export default function ButtonBasic(props) {
   return (
    <Button variant="contained" size =  {props.size}>
    {props.children}
   
    </Button>
   )
}
