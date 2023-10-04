import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormasage, setErrorMsg] = useState('')
  const [showsubmiterror, setShowSubmitError] = useState(false)

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onSubmitFaliur = errorMsg => {
    setErrorMsg(errorMsg)
    setShowSubmitError(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiurl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiurl, option)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFaliur(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="bg-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-image"
        />
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME (rahul)
          </label>
          <input
            type="text"
            id="username"
            className="input-el"
            value={username}
            placeholder="Username"
            onChange={onChangeUsername}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            PASSWORD (rahul@2021)
          </label>
          <input
            type="password"
            id="password"
            className="input-el"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
        {showsubmiterror && <p className="description">*{errormasage}</p>}
      </form>
    </div>
  )
}
export default LoginForm
