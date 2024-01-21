function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
      <figure className="popup__container popup__container_type_image-figure">
        <img src={props.card.link} className="popup__figure-pic" alt={props.card.name} />
        <figcaption className="popup__figure-caption">{props.card.name}</figcaption>
        <button className="popup__close-btn" aria-label="Закрыть" type="button" onClick={props.onClose} />
      </figure>
    </div>
  )
};

export default ImagePopup;