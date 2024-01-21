import { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditAvatar(props) {

  const avatarRef = useRef()
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    avatarRef.current.value = ''
  }, [currentUser])

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAvatarUpdate({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id='avatar-popuup'
      title='Обновить аватар'
      name='avatarEdit'
    >
      <label htmlFor="avatar-input" className="popup__label">
        <input ref={avatarRef} id="avatar-input" className="popup__input popup__input_data_url" type="url" name="avatarUrl" placeholder="Cсылка на фото профиля" required />
        <span className="avatar-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
};

export default PopupEditAvatar;
