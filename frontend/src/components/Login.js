import { useState } from "react"
import AuthForm from "./AuthForm";

function Login(props) {

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
    props.handleLogin(formValue.email, formValue.password);
    setFormValue('');
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <AuthForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        email={formValue.email}
        password={formValue.password}
        buttonTitle='Войти'
      ></AuthForm>
    </div>
  )
}

export default Login;