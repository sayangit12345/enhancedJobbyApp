import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const SimilarProductItem = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    title,
    employmentType,
  } = jobsDetails
  return (
    <li className="similar-item">
      <div className="eng-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-image"
        />
        <div className="eng-container2">
          <h1 className="heading5">{title}</h1>
          <div className="front-container">
            <AiFillStar className="star-icon" />
            <p className="description5">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-itemms-sontainer">
        <h1 className="description55">Description</h1>
        <p className="description6">{jobDescription}</p>
      </div>
      <div className="location-item-container">
        <div className="location-under-container">
          <MdLocationOn className="location-icon" />
          <p className="description5">{location}</p>
        </div>
        <div className="location-under-container">
          <FaSuitcase className="employee-icon" />
          <p className="description5">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
