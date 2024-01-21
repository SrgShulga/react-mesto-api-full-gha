import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const user = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={user.avatar} className="profile__avatar" alt="Изображение профиля" />
          <button className="profile__avatar-edit" type="button" aria-label="Редактировать фото профиля" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{user.name}</h1>
            <button className="profile__edit-btn" aria-label="Редактировать профиль" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{user.about}</p>
        </div>
        <button className="profile__add-btn" aria-label="Добавить фото" type="button" onClick={props.onAddCard}></button>
      </section>
      <section className="elements-container">
        <ul className="element">
          {props.cards.map((card) => (
            <Card
              link={card.link}
              name={card.name}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              card={card}
              key={card._id}
              likes={card.likes.length}
            />
          ))}
        </ul>
      </section>
    </main>
  )
};

export default Main;

