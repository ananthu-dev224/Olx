import React , { useContext } from 'react';
import { AuthContext , FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
function Header() {
  const { user } = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  const history = useHistory()
  const handleLogOut = () =>{
        auth.signOut()
        history.push('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>


        {user ?
          <div className="loginPage">
            <img
              width="40px"
              height="40px"
              src="https://external-preview.redd.it/LYMHylvGTOGWxcQgRKdZcAsyz4i6HGI01g-8hI9_IFw.jpg?auto=webp&s=c5fa678af27763e09c6e80c0aa6caa5c6d338ff9"
              alt="logo"
            />
            <span>{user.displayName}</span>
          </div> : <span style={{cursor:'pointer' , fontWeight:'bold', fontSize:'18px'}} onClick={() => history.push('/login')}>Login</span>
        }

        {user &&
          <div className="loginPage">
            <span style={{ cursor: 'pointer' }} onClick={handleLogOut}>Logout</span>
            <hr />
          </div>
        }


        <div className="sellMenu" onClick={() => history.push('/sell')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
