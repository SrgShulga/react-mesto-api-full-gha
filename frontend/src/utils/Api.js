export class Api {
  constructor(apiUrl) {
    this._link = apiUrl;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._link}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._checkServerResponse)
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._checkServerResponse)
  }

  sendUserInfo(userName, userDescription) {
    return fetch(`${this._link}users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: userName, about: userDescription }),
    })
      .then(this._checkServerResponse)
  }

  createNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, link })
    })
      .then(this._checkServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._checkServerResponse)
  }

  changeCardLikeStatus(cardId, isLiked) {
    const methodUsed = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: methodUsed,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._checkServerResponse)
  }

  sendAvatarData(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(this._checkServerResponse)
  }
};

export const apiRequest = new Api('https://api.mestosocial.students.nomoredomainsmonster.ru/');

