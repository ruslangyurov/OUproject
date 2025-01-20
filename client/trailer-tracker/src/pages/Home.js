
import ResponsiveAppBar from '../Components/appBar';
import ListDividers from '../Components/Divider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



export const Home = () => {
  return (
    <>
      <div>
        <ListDividers />
      </div>

      <div className='footer'>
        <p className='footer-text-left'>
          <Link to='/Admin' className='link'>
            Admin
          </Link>
        </p>
      </div>
    </>
  );
};
