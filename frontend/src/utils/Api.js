import { apiTemplate } from "./utils";

export class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
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
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  sendUserInfo(userName, userDescription) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        about: userDescription
      })
    })
      .then(this._checkServerResponse)
  }

  createNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(this._checkServerResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._checkServerResponse)
  }

  changeCardLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT'
      })
        .then(this._checkServerResponse)
    } else {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE'
      })
        .then(this._checkServerResponse)
    }
  }

  sendAvatarData(avatarLink) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(this._checkServerResponse)
  }
};

export const apiRequest = new Api(apiTemplate)
