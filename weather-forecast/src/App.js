import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';

const apiKey="39129dd847c0eca20e38f05275f03cf2";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={userData:{},location:{},isLoading:true}
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((res)=>{
      console.log(res)
      this.setState({location:res})
      this.getWeatherData()
    });

  }
  getWeatherData(){
    fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.coords.latitude}&lon=${this.state.location.coords.longitude}&cnt=6&appid=${apiKey}`)
    .then(res=>res.json())
    .then((result)=>{
      this.setState({userData:result,isLoading:false})
      console.log(this.state.userData)
    }
    )
   
  }
  render(){
    const {userData,isLoading}=this.state;
    if(isLoading){
      return null;
    }
    return(
     <Container>
       <header>
         The Weather in {this.state.userData.name}
       </header>
       <div className='cards'>
         <WeatherCard weatherData={userData}/>
       </div>
     </Container>
    )
  }
}
function WeatherCard(props){
  console.log(props)
  const iconURL=`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`
  return(
    <Card   border='prime'  text='dark' bg='light' style={{ width: '18rem' }}>
       <Card.Img variant="top" src={iconURL} style={{ width: '100%' }} />
       <Card.Body>
        <Card.Title>Current weather is {props.weatherData.weather[0].main}</Card.Title>
        <Card.Text>Current temperature is {ConvertTemp(props.weatherData.main.temp)}</Card.Text>
        <Card.Text>Today's max temperature is {ConvertTemp(props.weatherData.main.temp_max)}</Card.Text>
        <Card.Text>Today's min temperature is {ConvertTemp(props.weatherData.main.temp_min)}</Card.Text>
       </Card.Body>
    </Card>
  )
}
function ConvertTemp(temp){
  return Math.round(temp-273.15)+'°C'
}
export default App;
