class AuthApi {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки ${res.status}`);
    }
  }

  checkToken(token) {
    return fetch(`${this._apiUrl}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkServerResponse)
  }

  userRegister(email, password) {
    return fetch(`${this._apiUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkServerResponse)
  }

  userAuthorize(email, password) {
    return fetch(`${this._apiUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkServerResponse)
      .then((userData) => {
        if (userData.token) { localStorage.setItem('token', userData.token) }
      })
  }
}

const authApi = new AuthApi('https://api.mestosocial.students.nomoredomainsmonster.ru/');
export default authApi;
