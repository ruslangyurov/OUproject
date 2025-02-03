import react, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';



export const useAdminLocation = () => {

   const location = useLocation();
   const [headerText, setHeaderText] = useState();


    useEffect(() => {
      switch(location.pathname) {
        
        case '/Admin/menu': setHeaderText("Admin")
          break
        case '/Admin/menu/new-user':setHeaderText("Create New User")
          break
}
    },[location.pathname])

    return headerText;
  }
    
