import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg'


function Header(props) {

  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} className="header__loog" alt="Логотип Mesto" />
      <div className="header__menu-area">
        {props.isLoggedIn ? (
          <>
            <p className="header__menu-item">{props.email}</p>
            <Link to='/sign-in' className="header__menu-item" onClick={props.isLogout}>Выйти</Link>
          </>
        ) : (
          (location.pathname === '/sign-up') ? (
            <>
              <Link to="/sign-in" className="header__menu-item">Войти</Link>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
            </>
          )
        )}
      </div>
    </header>
  )
}

export default Header;