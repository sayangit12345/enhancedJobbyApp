import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {FaSuitcase} from 'react-icons/fa'
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    companyDetailsList: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDescription()
  }

  getFormattedData = data => ({
    job_details: data.job_details,
    skills: data.skills,
    life_at_company: data.life_at_company,
  })

  getJobDescription = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, option)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetailsData = [data.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobDetails = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        companyDetailsList: updatedJobDetailsData,
        similarJobsList: updatedSimilarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  rendersuccessDetails = () => {
    const {companyDetailsList, similarJobsList} = this.state
    if (companyDetailsList.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = companyDetailsList[0]

      return (
        <>
          <div className="job-detailss-container">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-image"
              />
              <div className="company-title-container">
                <h1 className="company-title-heading">{title}</h1>
                <div className="company-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="company-rating-description">{rating}</p>
                </div>
              </div>
            </div>
            <div className="company-location-container">
              <div className="company-page-location-container">
                <div className="page-location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="company-location-description">{location}</p>
                </div>
                <div className="page-location-container">
                  <FaSuitcase className="employee-type-icon" />
                  <p className="company-description">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="company-package-description">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="company-horizontal-line" />
            <div className="company-description-container">
              <h1 className="company-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-visit-url">
                Visit <BiLinkExternal />
              </a>
            </div>
            <p className="company-description">{jobDescription}</p>
            <h1 className="company-skills-heading">Skills</h1>
            <ul className="company-skills-image-container">
              {skills.map(eachItem => (
                <li key={eachItem.name} className="skills-items">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-image"
                  />
                  <p className="skill-description">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-container">
              <div>
                <h1 className="company-life-heading">Life at Company</h1>
                <p className="company-life-description">
                  {lifeAtCompany.description}
                </p>
              </div>
              <div className="company-life-image-container">
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="company-profile-image"
                />
              </div>
            </div>
          </div>
          <div className="similar-jobs-container">
            <h1 className="similar-job-heading">Similar Jobs</h1>
            <ul className="similar-jobs-list-container">
              {similarJobsList.map(eachItem => (
                <SimilarJobs key={eachItem.id} similarJobsDetails={eachItem} />
              ))}
            </ul>
          </div>
        </>
      )
    }
    return null
  }

  renderfaliurDetails = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderprogressDetails = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.rendersuccessDetails()
      case apiStatusConstants.failure:
        return this.renderfaliurDetails()
      case apiStatusConstants.inProgress:
        return this.renderprogressDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-page-details-container">
        <Header />
        <div className="job-description-container">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}
export default JobDetails
