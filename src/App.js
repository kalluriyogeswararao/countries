import {Component} from 'react'
import './App.css'

const initialCountriesList = [
  {
    id: '53c9c67a-c923-4927-8a75-fdfc4bc5ec61',
    name: 'Australia',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-australia-img.png',
    isVisited: false,
  },
  {
    id: '8baa8029-fb2c-4f06-bfcc-3dc9ad12b24d',
    name: 'Canada',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-canada-img.png',
    isVisited: false,
  },
  {
    id: '1b520f98-6548-41f3-816e-c8b887865172',
    name: 'Greenland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-greenland-img.png',
    isVisited: false,
  },
  {
    id: '25841996-fbfd-4554-add4-4c94082c8ccd',
    name: 'India',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-india-img.png',
    isVisited: true,
  },
  {
    id: '603c3568-13b0-11ec-82a8-0242ac130003',
    name: 'Netherlands',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-netherland-img.png',
    isVisited: false,
  },
  {
    id: '3c988dec-55e1-477d-a9e2-b354fd559849',
    name: 'Portugal',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-portugal-img.png',
    isVisited: false,
  },
  {
    id: 'd766f754-34f7-413e-81ec-9992821b97fa',
    name: 'Switzerland',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-switzerland-img.png',
    isVisited: false,
  },
  {
    id: '7ebb4e04-b124-417f-a69e-564a456d70f1',
    name: 'Thailand',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-thailand-img.png',
    isVisited: false,
  },
  {
    id: '1e4b1dcd-6ace-4dde-ad8d-675927d5ae47',
    name: 'United Kingdom',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-united-kingdom-img.png',
    isVisited: true,
  },
  {
    id: 'e76da8ca-bc48-4981-902b-a4d2d46feb6d',
    name: 'Venezuela',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/visit-countries-venezuela-img.png',
    isVisited: false,
  },
]

const CountryItem = props => {
  const {countryDetails, clickVisitButton} = props
  const {id, name, isVisited} = countryDetails
  const onClickVisitBtn = () => {
    clickVisitButton(id)
  }

  return (
    <li className="each-country">
      <p> {name}</p>
      {isVisited && <p className="visitedBtn">Visited</p>}
      {!isVisited && (
        <button type="button" className="visit-btn" onClick={onClickVisitBtn}>
          Visit
        </button>
      )}
    </li>
  )
}

const VisitCountryData = props => {
  const {VisitCountry, clickRemoveVisit} = props
  const {imageUrl, name, id} = VisitCountry

  const onClickRemoveVisit = () => {
    clickRemoveVisit(id)
  }

  return (
    <li className="each-visit">
      <img src={imageUrl} alt="thumbnail" className="thumbnail-image" />
      <div className="country-data">
        <p className="name">{name}</p>
        <button
          type="button"
          className="remove-btn"
          onClick={onClickRemoveVisit}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

class App extends Component {
  state = {visitedList: [], visitDisplayList: initialCountriesList}

  componentDidMount() {
    this.onRenderInitially()
  }

  onRenderInitially = () => {
    const {visitDisplayList} = this.state
    const findCountryData = visitDisplayList.filter(
      item => item.isVisited === true,
    )
    this.setState({visitedList: findCountryData})
  }

  clickRemoveVisit = id => {
    const {visitedList} = this.state
    this.setState(prevState => ({
      visitDisplayList: prevState.visitDisplayList.map(remove => {
        if (remove.id === id) {
          return {...remove, isVisited: false}
        }
        return {...remove}
      }),
    }))

    const filterData = visitedList.filter(eachData => eachData.id !== id)
    this.setState({visitedList: filterData})
  }

  onRenderVisitedCountryList = visitedList => (
    <ul className="visited-list">
      {visitedList.map(eachCountry => (
        <VisitCountryData
          VisitCountry={eachCountry}
          key={eachCountry.id}
          clickRemoveVisit={this.clickRemoveVisit}
        />
      ))}
    </ul>
  )

  onRenderEmptyList = () => (
    <div className="no-country-container">
      <p className="no-country">No countries visited yet</p>
    </div>
  )

  onRenderVisitedList = () => {
    const {visitedList} = this.state
    if (visitedList.length > 0) {
      return this.onRenderVisitedCountryList(visitedList)
    }
    return this.onRenderEmptyList()
  }

  clickVisitButton = id => {
    const {visitDisplayList} = this.state
    const findCountry = visitDisplayList.find(item => item.id === id)
    this.setState(prevState => ({
      visitedList: [...prevState.visitedList, findCountry],
    }))
    this.setState(prevState => ({
      visitDisplayList: prevState.visitDisplayList.map(country => {
        if (country.id === id) {
          return {...country, isVisited: true}
        }
        return {...country}
      }),
    }))
  }

  render() {
    const {visitDisplayList} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Countries</h1>
        <ul className="country-list-container">
          {visitDisplayList.map(each => (
            <CountryItem
              countryDetails={each}
              key={each.id}
              clickVisitButton={this.clickVisitButton}
            />
          ))}
        </ul>
        <h1 className="main-heading">Visited Countries</h1>
        {this.onRenderVisitedList()}
      </div>
    )
  }
}

export default App
