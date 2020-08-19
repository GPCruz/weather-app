import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container, Row, Col } from 'react-bootstrap';
import CityList from './CityList';

const api = {
  googleApiKey: "AIzaSyDBana2F66qgG8hHPLsH65keZXK-6TKirg",
  key:          "993d21143452331366edbd6514c2b382",
  base:         "http://api.openweathermap.org/data/2.5/"
}

function openWeatherRequest(lat,lon,cnt){
  return api.base+'find?lat='+lat+'&lon='+lon+'&cnt='+cnt+'&APPID='+api.key;
}

class App extends Component{
  state = {
    showList:false,
    showingTemperature:false,
    activeMarker: {},
    selectedPlace: {},
    currentPlace: {main:{temp_max:null,temp_min:null}},
    currentLat:37.778519,
    currentLng:-122.405640,
    searchResult: []
  }; 

  componentDidMount(){
    this.fetchData();
  }

  fetchData = () =>{
    fetch(openWeatherRequest(this.state.currentLat,this.state.currentLng,15))
      .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          searchResult: json.list,
          currentPlace: json.list[0]
        })
      })
  }

  hideList(){
    this.setState({
      showList:false
    })
  };

  onButtonClicked = async (props) => {
    this.fetchData();
    this.setState({
      showList: true
    })
  };

  onMapClicked = (props, map, clickEvent) => {
    let { latLng } = clickEvent;
    this.setState({
      currentLat: latLng.lat(),
      currentLng: latLng.lng()
    })
  };

  render() {
    return (
        <div className="App">
          <Container fluid>
            <Row>
              <Col>
                <div className="Search-button-bar">
                  <button onClick = {() =>this.onButtonClicked()}>
                    Search
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={3} style={{display: this.state.showList ? 'block' : 'none' }} className="Result-list">  
                <CityList data={this.state.searchResult} reset={this.state.showList}></CityList>
              </Col>
              <Col xs={0.5} style={{display: this.state.showList ? 'block' : 'none' }} className="close" aria-label="Close" onClick={() =>this.hideList()}>
                <span aria-hidden="true">&lt;</span>
              </Col>
              <Col>
                <div className="Google-map">
                  <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}>
                    <Marker
                      onClick={this.onMarkerClick}
                      position={{lat: this.state.currentLat, lng: this.state.currentLng}} />
                  </Map>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: (api.googleApiKey)
})(App)