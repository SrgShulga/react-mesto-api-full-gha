function AuthForm(props) {
  return (
    <form className="auth__form" onSubmit={props.onSubmit}>
      <label htmlFor="email-input" className="auth__label">
        <input id="email-input" type="email" onChange={props.onChange} value={props.email || ''} className="auth__input" name="email" placeholder="Email" minLength='8' maxLength='40' required />
        <span className="auth__input-error auth__input-error_email" />
      </label>
      <label htmlFor="password-input" className="auth__label">
        <input id="password-input" type="password" onChange={props.onChange} value={props.password || ''} className="auth__input" name="password" placeholder="Пароль" minLength='6' maxLength='18' required />
        <span className="auth__input-error auth__input-error_password" />
      </label>
      <button type="submit" className="auth__submit-btn" aria-label={props.buttonTitle}>{props.buttonTitle}</button>
    </form>
  )
}
export default AuthForm;