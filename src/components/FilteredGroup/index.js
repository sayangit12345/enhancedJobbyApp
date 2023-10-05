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

const FilteredGroup = props => {
  const {changeInputItem, changeInputItemTwo, profileData} = props
  const {name, profileImageUrl, shortBio} = profileData

  console.log(profileData)
  const onClickInputItem = event => {
    changeInputItem(event.target.value)
  }

  const onClickInputItemTwo = event => {
    changeInputItemTwo(event.target.value)
  }

  return (
    <div className="filter-container">
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="avatar" />
        <h1 className="profile-heading">{name}</h1>
        <p className="description-profile">{shortBio}</p>
      </div>
      <hr className="horizona" />
      <div className="filter-container22">
        <h1 className="description-profile223">Type of Employment</h1>
        <ul className="label-conatainer">
          {employmentTypesList.map(eachItem => (
            <li className="label-el" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
                onChange={onClickInputItem}
                name="sayan"
              />
              <label className="lable" htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="horizona" />
      <div className="filter-container22">
        <h1 className="description-profile223">Salary Range</h1>
        <ul className="label-conatainer2">
          {salaryRangesList.map(eachItem => (
            <li className="label-el" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
                onChange={onClickInputItemTwo}
                name="sayan"
              />
              <label htmlFor={eachItem.salaryRangeId} className="lable">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default FilteredGroup
