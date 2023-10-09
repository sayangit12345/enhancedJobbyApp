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
    <li className="all-jobs-list">
      <Link to={`/jobs/${id}`} className="all-jobs-nav-link">
        <div className="all-jobs-list-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-image"
          />
          <div className="all-jobs-title-container">
            <h1 className="all-jobs-title-heading">{title}</h1>
            <div className="all-jobs-rating-container">
              <AiFillStar className="star-icon" />
              <p className="all-jobs-description">{rating}</p>
            </div>
          </div>
        </div>
        <div className="all-jobs-location-and-employement-container">
          <div className="all-jobs-location-container">
            <div className="all-jobs-location-icon-container">
              <MdLocationOn className="location-icon" />
              <p className="all-jobs-location-description">{location}</p>
            </div>
            <div className="all-jobs-location-icon-container">
              <FaSuitcase className="employee-icon" />
              <p className="all-jobs-employement-description">
                {employmentType}
              </p>
            </div>
          </div>
          <div className="all-jobs-package-container">
            <p className="all-jobs-package-description">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="all-jobs-horizon-line" />
        <div className="all-jobs-description-container">
          <h1 className="all-jobs-job-heading">Description</h1>
          <p className="all-jobs-job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsList
