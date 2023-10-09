import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {
    locationListId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationListId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationListId: 'CHENNAI',
    label: 'Chennai',
  },
  {
    locationListId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationListId: 'MUMBAI',
    label: 'Mumbai',
  },
]

const FilterJobs = props => {
  const {
    changeEmployementType,
    changeSalary,
    changeLocation,
    // clearAllFilter,
    profileData,
  } = props

  const onChangeEmployementType = event => {
    changeEmployementType(event.target.value)
  }

  const onChangeSalary = event => {
    changeSalary(event.target.value)
  }

  const onChangeLocation = event => {
    changeLocation(event.target.value)
  }

  //   const onClickClearAll = () => {
  //     clearAllFilter()
  //   }

  const renderProfileDetails = () => {
    if (profileData.length >= 1) {
      const {name, profileImageUrl, shortBio} = profileData[0]

      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-heading">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="filter-jobs-container">
      {renderProfileDetails()}
      <hr className="horizontal-line" />
      <div className="employement-filter-container">
        <h1 className="employement-heading">Type of Employment</h1>
        <ul className="employment-type-list-container">
          {employmentTypesList.map(eachItem => (
            <li
              className="employement-list-item"
              key={eachItem.employmentTypeId}
            >
              <input
                type="checkbox"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
                onChange={onChangeEmployementType}
                name="employement"
              />
              <label
                className="employement-label"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="horizontal-line" />
      <div className="salary-filter-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachItem => (
            <li className="salary-list-item" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                onChange={onChangeSalary}
                name="salary"
              />
              <label htmlFor={eachItem.salaryRangeId} className="salary-label">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="horizontal-line" />
      <div className="location-filter-container">
        <h1 className="location-heading">Location</h1>
        <ul className="location-type-list-container">
          {locationList.map(eachItem => (
            <li className="location-list-item" key={eachItem.locationListId}>
              <input
                type="checkbox"
                value={eachItem.locationListId}
                id={eachItem.locationListId}
                onChange={onChangeLocation}
                name="location"
              />
              <label
                className="location-label"
                htmlFor={eachItem.locationListId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* <button
        type="button"
        className="clear-all-button"
        onClick={onClickClearAll}
      >
        Clear All
      </button> */}
    </div>
  )
}
export default FilterJobs
