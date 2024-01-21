import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUserUpdate({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id='edit-popup'
      title='Редактировать профиль'
      name='profileEdit'>
      <>
        <label htmlFor="username-input" className="popup__label">
          <input id="username-input" value={name ?? ''} onChange={handleChangeName} className="popup__input popup__input_data_name" minLength="2" maxLength="40" name="userName" placeholder="Имя" required />
          <span className="username-input-error popup__input-error"></span>
        </label>
        <label htmlFor="description-input" className="popup__label">
          <input id="description-input" value={description ?? ''} onChange={handleChangeDescription} className="popup__input popup__input_data_description" minLength="2" maxLength="200" name="userDescription" placeholder="О себе" required />
          <span className="description-input-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  )
};

export default PopupEditProfile;