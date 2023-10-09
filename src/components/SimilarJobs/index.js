import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    title,
    employmentType,
  } = similarJobsDetails
  return (
    <li className="similar-jobs-list">
      <div className="similar-jobs-logo-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-image"
        />
        <div className="similar-jobs-title-container">
          <h1 className="similar-job-title-heading">{title}</h1>
          <div className="similar-jobs-rating-container">
            <AiFillStar className="star-icon" />
            <p className="similar-jobs-rating-description">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-jobs-description-container">
        <h1 className="similar-jobs-description-heading">Description</h1>
        <p className="similar-jobs-description-description">{jobDescription}</p>
      </div>
      <div className="similar-jobs-location-container">
        <div className="similar-jobs-location-and-employement-container">
          <MdLocationOn className="location-icon" />
          <p className="similar-jobs-location-description">{location}</p>
        </div>
        <div className="similar-jobs-employement-container">
          <FaSuitcase className="employee-icon" />
          <p className="similar-jobs-employement-description">
            {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
