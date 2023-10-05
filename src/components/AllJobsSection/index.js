import './index.css'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import JobsList from '../JobsList'
import FilteredGroup from '../FilteredGroup'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    profileData: [],
    searchInputValue: '',
    inputItem: [],
    inputItemTwo: [],
    apiStatus: apiStatusConstants.initial,
    jobsListItems: [],
  }

  componentDidMount() {
    this.getJobsList()
    this.onGetProfileDetails()
  }

  onEnterSearchInput = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onChangeInputItem = value => {
    this.setState({inputItem: value}, this.getJobsList)
  }

  onChangeInputItemTwo = valueTwo => {
    this.setState({inputItemTwo: valueTwo}, this.getJobsList)
  }

  getJobsList = async () => {
    const {searchInputValue, inputItem, inputItemTwo} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${inputItem}&minimum_package=${inputItemTwo}&search=${searchInputValue}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()

      const fetchedData = data.jobs.map(eachMap => ({
        companyLogoUrl: eachMap.company_logo_url,
        employmentType: eachMap.employment_type,
        id: eachMap.id,
        jobDescription: eachMap.job_description,
        location: eachMap.location,
        packagePerAnnum: eachMap.package_per_annum,
        rating: eachMap.rating,
        title: eachMap.title,
      }))
      this.setState({
        jobsListItems: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, optionsProfile)

    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))

      this.setState({
        profileData: updatedDataProfile,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
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
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderOriginalList = () => {
    const {jobsListItems} = this.state
    const noJobs = jobsListItems.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="heading">No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="list-container">
        {jobsListItems.map(eachItem => (
          <JobsList key={eachItem.id} allJobsDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderProductsListView = () => (
    <div className="bottom-containers">
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.onEnterSearchInput}
          className="search-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      {this.renderOriginalList()}
    </div>
  )

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {profileData} = this.state

    return (
      <div className="jobs-container">
        <FilteredGroup
          changeInputItem={this.onChangeInputItem}
          changeInputItemTwo={this.onChangeInputItemTwo}
          profileData={profileData}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}
export default AllJobsSection
