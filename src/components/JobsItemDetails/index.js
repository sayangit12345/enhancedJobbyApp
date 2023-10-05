import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {FaSuitcase} from 'react-icons/fa'
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsItemDetails extends Component {
  state = {
    jobsItemList: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDescription()
  }

  getFormattedData = data => ({
    job_details: data.job_details,
    skills: data.skills,
    life_at_company: data.life_at_company,
  })

  getJobsDescription = async props => {
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
        jobsItemList: updatedJobDetailsData,
        similarJobs: updatedSimilarJobDetails,
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
    const {jobsItemList, similarJobs} = this.state
    if (jobsItemList.length >= 1) {
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
      } = jobsItemList[0]

      return (
        <>
          <div className="cards-container11">
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
            <div className="eng-container3">
              <div className="page-location-container">
                <div className="page-location-und-container">
                  <MdLocationOn className="location-icon" />
                  <p className="description5">{location}</p>
                </div>
                <div className="page-location-und-container">
                  <FaSuitcase className="employee-icon" />
                  <p className="description5">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="description56">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="horizon-line2" />
            <div className="upper-container">
              <h1 className="description55">Description</h1>
              <a href={companyWebsiteUrl} className="anchor-el">
                Visit <BiLinkExternal />
              </a>
            </div>
            <p className="description6">{jobDescription}</p>
            <h1 className="description6">Skills</h1>
            <ul className="containers5">
              {skills.map(eachItem => (
                <li key={eachItem.name} className="items">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="image4"
                  />
                  <p className="description6">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="back-container">
              <div>
                <h1 className="description6">Life at Company</h1>
                <p className="description6">{lifeAtCompany.description}</p>
              </div>
              <div className="bottom-container">
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="image10"
                />
              </div>
            </div>
          </div>
          <div className="similar-container">
            <h1 className="description66">Similar Jobs</h1>
            <ul className="similar-list">
              {similarJobs.map(eachItem => (
                <SimilarProductItem key={eachItem.id} jobsDetails={eachItem} />
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
      <>
        <Header />
        <div className="bg-container2">{this.renderJobDetails()}</div>
      </>
    )
  }
}
export default JobsItemDetails
