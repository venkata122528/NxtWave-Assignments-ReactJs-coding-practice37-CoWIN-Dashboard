// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    switch (number) {
      case 0:
        return '0'
      case 4:
        return '1500k'
      case 8:
        return '3000k'
      case 12:
        return '4500k'
      case 16:
        return '6000k'
      default:
        return null
    }
  }

  return (
    <div>
      <h1 className="title">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={500}>
        <BarChart data={last7DaysVaccination} margin={{top: 5}}>
          <XAxis
            dataKey="vaccine_date"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="15%" />
          <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="15%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
