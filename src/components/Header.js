import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../utils/AuthContext'

const Header = () => {
  let { user, logoutUser} = useContext(AuthContext)

  return (
    <div className='app-header'>
        <h1>Miaki Note Plus</h1>

        {user ? (
                 <button  onClick={logoutUser}>Logout</button>
            ): null} 
    </div>
  )
};

export default Header;
