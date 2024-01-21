import React from 'react';
import success from '../images/Succes-icon.svg';
import error from '../images/Error-icon.svg'
import { useLocation, useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
  const location = useLocation();
  const navigate = useNavigate();
  function redirectPopup() {
    if (props.status) {
      props.onClose()
      if (location.pathname === '/sign-up') { navigate('/sign-in', { replace: true }) }
    }
    props.onClose();
  }

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={redirectPopup} aria-label="Закрыть попап" />
        <div className="auth__info-container">
          {props.status ? (
            <>
              <img src={success} className="auth__status-icon" alt="Успешно" />
              <p className="auth__status-text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img src={error} className="auth__status-icon" alt="Ошибка" />
              <p className="auth__status-text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;