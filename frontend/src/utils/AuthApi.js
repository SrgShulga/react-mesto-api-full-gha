class AuthApi {
  constructor(apiUrl) {
    this._authUrl = apiUrl;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки ${res.status}`);
    }
  }

  checkToken(token) {
    return fetch(`${this._authUrl}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkServerResponse)
  }

  userRegister(email, password) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkServerResponse)
  }

  userAuthorize(email, password) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkServerResponse)
      .then((userData) => {
        if (userData.userToken) { localStorage.setItem('token', userData.userToken) }
      })
  }
}

const authApi = new AuthApi('https://api.mestosocial.students.nomoredomainsmonster.ru/');
export default authApi;
