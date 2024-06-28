
import Bay from '../Components/Bay'


export const Inbound = () => {

    const bayList = []
    for (let j=1;j<5; j++) {
              bayList.push(<Bay key = {j} child = {j} sx={{m:0}}/>)
             }

    return (
        <>
             
              {bayList}
        </>
       
        )
}