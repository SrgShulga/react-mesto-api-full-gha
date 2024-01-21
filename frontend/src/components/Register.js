import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleRegister(formValue.email, formValue.password)
    setFormValue('')
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <AuthForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        email={formValue.email}
        password={formValue.password}
        buttonTitle='Зарегистрироваться'
      ></AuthForm>
      <div className="auth__signin">
        <p>Уже зарегистрированы?</p>
        <Link to='/sign-in' className="auth__link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;