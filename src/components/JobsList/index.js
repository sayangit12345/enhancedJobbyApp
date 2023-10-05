import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const JobsList = props => {
  const {allJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = allJobsDetails

  return (
    <li className="list-items">
      <Link to={`/jobs/${id}`} className="nav-links2">
        <div className="eng-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-image"
          />
          <div className="eng-container2">
            <h1 className="heading5">{title}</h1>
            <div className="rating-item-container">
              <AiFillStar className="star-icons" />
              <p className="description5">{rating}</p>
            </div>
          </div>
        </div>
        <div className="eng-container3">
          <div className="eng-loc-container">
            <div className="eng-loc-icon-container">
              <MdLocationOn className="location-icon" />
              <p className="description5">{location}</p>
            </div>
            <div className="eng-loc-icon-container">
              <FaSuitcase className="employee-icon" />
              <p className="description5">{employmentType}</p>
            </div>
          </div>
          <div className="descrip-container">
            <p className="description5">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizon-line22" />
        <div>
          <h1 className="description667">Description</h1>
          <p className="description6">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsList
