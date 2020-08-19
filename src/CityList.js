import React, { Component } from 'react';
import './App.css';

function kelvinToCelcius(Temp){
  return Math.round(Temp-= 273.15,2);
}

class CityList extends Component {
  state={
    showingTemperature:-1
  };

  onLocationClicked(id){
    if (this.state.showingTemperature===id)
      this.setState({
        showingTemperature:  -1  
      })
    else
      this.setState({
        showingTemperature:  id
      });
  }
  toggleTemperature(id){
    if (this.state.showingTemperature===id)
      return true
    else
      return false
  }
  render(){
    const {data} = this.props;
    const listItems =  data.map((item, index) =>
      <li onClick={()=>this.onLocationClicked(item.id)} key={item.id}>
        {item.name}
        <ul style={{display: this.toggleTemperature(item.id)? 'block' : 'none'}} className="Temperatures">
          <li>Min {kelvinToCelcius(item.main.temp_min)}°C/Max {kelvinToCelcius(item.main.temp_max)}°C</li>
        </ul>
      </li> );
                    
    return(
      <ul className="City-List">{listItems}</ul>
      
    );
  }
}

export default CityList;