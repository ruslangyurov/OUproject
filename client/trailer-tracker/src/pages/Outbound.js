
import Bay from '../Components/Bay'


export const Outbound = () => {

    const bayList = []
    for (let j=5;j<10; j++) {
              bayList.push(<Bay key = {j} child = {j}/>)
             }

    return (
        <>
             
              {bayList}
        </>
       
        )
}