import './index.css'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import JobsList from '../JobsList'
import FilterJobs from '../FilterJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsList extends Component {
  state = {
    profileData: [],
    searchInputValue: '',
    employementTypeList: [],
    salaryRange: [],
    apiStatus: apiStatusConstants.initial,
    allJobsList: [],
    locationlist: [],
  }

  componentDidMount() {
    this.getJobsList()
    this.onGetProfileDetails()
  }

  onClickSearchInput = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onChangeEmployementType = typeId => {
    const {employementTypeList} = this.state
    let updatedList = employementTypeList
    if (employementTypeList.includes(typeId)) {
      updatedList = employementTypeList.filter(eachType => eachType !== typeId)
    } else {
      updatedList = [...updatedList, typeId]
    }
    this.setState({employementTypeList: updatedList}, this.getJobsList)
  }

  onChangeSalary = valueTwo => {
    this.setState({salaryRange: valueTwo}, this.getJobsList)
  }

  //   onClickClearAllFilter = () => {
  //     this.setState(
  //       {salaryRange: [], employementTypeList: [], locationlist: []},
  //       this.getJobsList,
  //     )
  //   }

  onClickRetryJobs = () => {
    this.getJobsList()
  }

  onChangeLocation = locationid => {
    this.setState({locationlist: locationid}, this.getJobsList)
  }

  getJobsList = async () => {
    const {
      searchInputValue,
      employementTypeList,
      salaryRange,
      locationlist,
    } = this.state
    console.log(searchInputValue)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employementTypeList}&minimum_package=${salaryRange}&search=${searchInputValue}&location=${locationlist}`
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
        allJobsList: fetchedData,
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
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  renderOriginalList = () => {
    const {allJobsList} = this.state
    const noJobs = allJobsList.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {allJobsList.map(eachItem => (
          <JobsList key={eachItem.id} allJobsDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderJobsListView = () => (
    <div className="all-jobs-container">
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
          onClick={this.onClickSearchInput}
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

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
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
      <div className="job-list-container">
        <FilterJobs
          changeEmployementType={this.onChangeEmployementType}
          changeSalary={this.onChangeSalary}
          changeLocation={this.onChangeLocation}
          profileData={profileData}
          //   clearAllFilter={this.onClickClearAllFilter}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}
export default AllJobsList
