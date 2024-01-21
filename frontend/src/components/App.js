import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupEditProfile from "./PopupEditProfile";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupAddCard from "./PopupAddCard";
import { apiRequest } from "../utils/Api";
import authApi from "../utils/AuthApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";


function App() {

  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);
  const [isInfoToolOpen, setInfoToolOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([apiRequest.getUserInfo(), apiRequest.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user)
        setCards(initialCards)
      })
      .catch((err) => console.log(`Возникла ошибка при получении данных с сервера: ${err}`))
  }, [])

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    if (userToken) {
      authApi.checkToken(userToken)
        .then((res) => { setEmail(res.data.email); setLoggedIn(true); navigate('/', { replace: true }) })
        .catch((err) => { console.log(`Возникла ошибка верификации токена, ${err}`) })
    }
  }, [navigate, isLoggedIn])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }
  function handleAddCardClick() {
    setAddCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard({
      name: card.name,
      link: card.link
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    apiRequest.changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => { setCards((state) => state.map((c) => c._id === card._id ? newCard : c)) })
      .catch((err) => { console.log(`Произошла ошибка при добавлении/удалении "мне нравится"${err}`) })
  }

  function handleCardDelete(card) {
    apiRequest.deleteCard(card._id)
      .then(() => { setCards((cardsArr) => cardsArr.filter((cardItem) => cardItem._id !== card._id)); closeAllPopups() })
      .catch((err) => console.log(`При удалении карточки произошла ошибка ${err}`));
  }

  function handleUpdateUser(userInfo) {
    apiRequest.sendUserInfo(userInfo.name, userInfo.about)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`При обновлении данныъх профиля произошла ошибка ${err}`) })
  }

  function handleAvatarUpdate(link) {
    apiRequest.sendAvatarData(link)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`При редактировании аватара произошла ошибка ${err}`) })
  }

  function handleAddCard(cardData) {
    apiRequest.createNewCard(cardData.name, cardData.link)
      .then((card) => { setCards([card, ...cards]); closeAllPopups() })
      .catch((err) => { console.log(`При добавлении карточки произошла ошибка ${err}`) })
  }

  function closeAllPopups() {
    setEditProfileOpen(false)
    setEditAvatarPopupOpen(false)
    setAddCardPopupOpen(false)
    setImagePopupOpen(false)
    setSelectedCard({})
    setInfoToolOpen(false)
  }

  function handleRegister(password, email) {
    authApi.userRegister(password, email)
      .then(() => { navigate('/sign-in', { replace: true }); setInfoToolOpen(true); setStatus(true) })
      .catch((err) => { console.log(`При регистрации произошла ошибка ${err}`); setInfoToolOpen(true); setStatus(false) })
  }

  function handleLogin(password, email) {
    authApi.userAuthorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => { console.log(`При авторизации произошла ошибка ${err}`); setInfoToolOpen(true); setStatus(false) })
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          isLoggedIn={isLoggedIn}
          isLogout={handleLogout} />
        <Routes>
          <Route path='*' element={
            <ProtectedRoute
              element={Main}
              cards={cards}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="sign-in" element={<Login handleLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUserUpdate={handleUpdateUser}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onAvatarUpdate={handleAvatarUpdate}
        />
        <PopupAddCard
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoToolOpen}
          onClose={closeAllPopups}
          status={status}
        />
      </CurrentUserContext.Provider>
    </>
  )
}

export default App;
