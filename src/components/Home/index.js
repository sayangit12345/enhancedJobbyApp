import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="main-container">
    <Header />
    <div className="card-container2">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="description3">
        Millions of people are searching for jobs,salary information,company
        reviews.Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="button3">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
