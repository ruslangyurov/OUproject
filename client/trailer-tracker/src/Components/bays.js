import Bay from './Bay'



export default function bays() {
    
    const bayList = []
    for (let j=1;j<5; j++) {
              bayList.push(<Bay key = {j} child = {j} sx={{m:0}}/>)
             }
    const u = bayList.map(val => {
        <li>{val}</li>
    })
    

    return (
    
        {u}
       
        )
    
}