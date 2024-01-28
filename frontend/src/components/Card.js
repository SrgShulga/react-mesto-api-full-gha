import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(item => item === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card)
  }

  function handleDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="element__card">
      <img src={props.link} className="element__card-image" alt={props.name} onClick={handleClick} />
      {isOwn && <button className="element__delete-btn" onClick={handleDelete} aria-label="Удалить" type="button" />}
      <div className="element__title-container">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLike} aria-label="Нравится" type="button" />
          <p className="element__like-counter">{props.likes}</p>
        </div>
      </div>
    </li>
  )
};

export default Card;