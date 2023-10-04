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
      <Link to="/" className="nav-links">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-image"
        />
      </Link>
      <div className="card-container">
        <div>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/" className="nav-link-sm">
            <AiFillHome className="small-header-icons" />
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link to="/jobs" className="nav-link-sm">
            <BsFillBriefcaseFill className="small-header-icons" />
          </Link>
        </div>
        <div>
          <button type="button" className="button2" onClick={onClickLogOut}>
            Logout
          </button>
          <button
            type="button"
            className="logout-icon-sm"
            onClick={onClickLogOut}
          >
            <FiLogOut className="logout-icon-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
