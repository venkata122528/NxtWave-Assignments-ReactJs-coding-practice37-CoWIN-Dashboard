// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {neededData: {}, status: apiStatus.initial}

  componentDidMount() {
    this.getNeededData()
  }

  getNeededData = async () => {
    this.setState({status: apiStatus.in_progress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const neededFormatData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({neededData: neededFormatData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  getFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1>Something went wrong</h1>
    </>
  )

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getSuccessView = () => {
    const {neededData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = neededData

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  render() {
    const {status} = this.state

    return (
      <div className="mainContainer">
        <div className="mainTitleLogoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="mainLogo"
            alt="website logo"
          />
          <h1 className="title">Co-WIN</h1>
        </div>
        <h1 className="title2">CoWIN Vaccination in India</h1>
        <div className="resultView">
          {status === apiStatus.failure && this.getFailureView()}
          {status === apiStatus.in_progress && this.getLoadingView()}
          {status === apiStatus.success && this.getSuccessView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
