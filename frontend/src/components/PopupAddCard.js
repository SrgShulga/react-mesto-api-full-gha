import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard(props) {

  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('')

  useEffect(() => {
    setCardTitle('');
    setCardLink('')
  }, [props.isOpen])

  function handleChangeCardTitle(evt) {
    setCardTitle(evt.target.value)
  }

  function handleChangeCardLink(evt) {
    setCardLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    props.onAddCard({
      name: cardTitle,
      link: cardLink
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id='add-popup'
      title='Новое место'
      name='addPopup'
      buttonText='Создать'
    >
      <>
        <label htmlFor="title-input" className="popup__label">
          <input id="title-input" value={cardTitle || ''} onChange={handleChangeCardTitle} className="popup__input popup__input_data_title" minLength="2" maxLength="30" name="placeTitle" placeholder="Название" required />
          <span className="title-input-error popup__input-error"></span>
        </label>
        <label htmlFor="url-input" className="popup__label">
          <input id="url-input" value={cardLink || ''} onChange={handleChangeCardLink} className="popup__input popup__input_data_url" type="url" name="placeUrl" placeholder="Ссылка на картинку" required />
          <span className="url-input-error popup__input-error"></span>
        </label>
      </>
    </PopupWithForm>
  )
};

export default PopupAddCard;