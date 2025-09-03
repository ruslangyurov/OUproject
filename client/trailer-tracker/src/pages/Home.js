
import ResponsiveAppBar from '../Components/appBar';
import ListDividers from '../Components/Divider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {useAuth} from '../Config/AuthContext';



export const Home = () => {

  const role = useAuth()
  const isAdmin = role === "Admin";

  return (
    <>
      <div>
        <ListDividers />
      </div>

      {isAdmin && <div className='footer'>
        <p className='footer-text-left'>
          <Link to='/Admin/menu' className='link'>
            Admin
          </Link>
        </p>
      </div> }
    </>
  );
};
