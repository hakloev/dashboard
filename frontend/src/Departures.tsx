import React from "React";
import styled from "styled-components";
import { fetchDepartures } from "./api/departures";
import { Platform, Departure } from "./api/departures/types";

type DeparturesProps = {

}

type DeparturesState = {
  isLoading: boolean,
  platforms: Platform[]
}

const DepartureHeader = styled.p`
  color: white;
`

function Departure(props: { departure: Departure }) {
  const { departure } = props

  return (
    <div>
      <DepartureHeader>{ departure.lineNumber + ' ' + departure.line }</DepartureHeader>
      <p>{ departure.plannedDeparture }</p>
    </div>   
  )
}

const PlatformWrapper = styled.div`
  background-color: #808D92;
`


function Platform(props: { platform: Platform }) {
  const { platform } = props

  return (
    <PlatformWrapper>
      <h1>{ platform.name + ' ' + platform.transportMode }</h1>
      {
        platform.departures
          .map(departure => <Departure key={ departure.plannedArrival } departure={ departure } />)
      }
    </PlatformWrapper>   
  )
}

const FETCH_DEPARTURES_INTERVAL = 30_000
 
class Departures extends React.PureComponent<DeparturesProps, DeparturesState> {

  fetchDeparturesInterval?: number

  state: DeparturesState = {
    isLoading: true,
    platforms: [],
  }


  componentDidMount() {
    document.addEventListener("visibilitychange", this.onFocus, false)

    this.getDepartures()

    this.fetchDeparturesInterval = setInterval(this.getDepartures, FETCH_DEPARTURES_INTERVAL)
  }

  componentWillUnmount() {
    window.removeEventListener("visibilitychange", this.onFocus)

    clearInterval(this.fetchDeparturesInterval)
  }

  onFocus = () => {
    if (document.visibilityState === "hidden") {
      console.log('hidden')
    } else if (document.visibilityState === "visible") {
      console.log('visible')
    }
  }

  getDepartures = async () => {
    console.log('fetch departures')

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