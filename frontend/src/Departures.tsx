import React from "React";
import { fetchDepartures } from "./api/departures";
import { Platform, Departure } from "./api/departures/types";

type DeparturesProps = {

}

type DeparturesState = {
  isLoading: boolean,
  platforms: Platform[]
}

function Departure(props: { departure: Departure }) {
  const { departure } = props

  return (
    <div>
      <h1>{ departure.lineNumber + ' ' + departure.line }</h1>
      <h2>{ departure.plannedDeparture }</h2>
    </div>   
  )
}


function Platform(props: { platform: Platform }) {
  const { platform } = props

  return (
    <div>
      <h1>{ platform.name + ' ' + platform.transportMode }</h1>
      {
        platform.departures
          .map(departure => <Departure key={ departure.plannedArrival } departure={ departure } />)
      }
    </div>   
  )
}
 
class Departures extends React.PureComponent<DeparturesProps, DeparturesState> {

  state: DeparturesState = {
    isLoading: true,
    platforms: [],
  }

  componentDidMount() {
    this.getDepartures()
  }

  async getDepartures() {
    const response = await fetchDepartures('NSR:StopPlace:58195')
    
    this.setState({ 
      isLoading: false, 
      platforms: response.platforms 
    })
  }

  render() {

    if (this.state.isLoading) {
      return <h1>laster...</h1>
    }

    return (
      <React.Fragment>
        {
          this.state.platforms
            .map(platform => <Platform key={ platform.name } platform={ platform } />)
        }
      </React.Fragment>
    )
  }

}

export default Departures