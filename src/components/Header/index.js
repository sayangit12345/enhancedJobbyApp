import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbar-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-image"
        />
      </Link>
      <ul className="navbar-option-container">
        <li>
          <Link to="/" className="nav-link-lg">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link-sm">
            <AiFillHome className="small-header-icons" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link-lg">
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link-sm">
            <BsFillBriefcaseFill className="small-header-icons" />
          </Link>
        </li>
        <li>
          <FiLogOut className="logout-icon-sm" onClick={onClickLogOut} />
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogOut}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
