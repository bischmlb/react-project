const axios = require('axios').default;
const fetch = require('node-fetch');




function fetchAllCoordsEvery4(){
    var networkPromise = axios.get('http://localhost:7071/api/HttpTrigger1?getLatLong')
                        .then(function(response){
                            const { data } = response;
                            console.log(data.LatLong);
                            console.log(data);
                        })
                        .catch(function(error){
                            console.log(error);
                        })
    
    
    var timeOutPromise = new Promise(function(resolve, reject) {
      //4 Sek
      setTimeout(resolve, 4000, 'Timeout Done, fetching all new coordinates');
    });
    /*
    Promise.all(
    [networkPromise, timeOutPromise])
      .then(function(values) {
        console.log("4 Sekunder...");
        // Kør igen
        fetchAllCoordsEvery4();
    });
    }*/
  //  fetchAllCoordsEvery4();
  }

  const openweathermapApiKey = '8a5cef3c50ea0a117d92fef78c859ce0';
  const fetchWeatherData = (lat, long) =>{
    axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat.toString() + '&lon=' + long.toString() + '&appid='+ openweathermapApiKey,
    {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        crossdomain: true,
        //withCredentials: true,

        })
    .then((response) => {
        const { data } = response;
        console.log(data);
    })
    .catch((error)=>{
        console.log(error);
    })
}

  


  fetchWeatherData(55, 12);
  //fetchWeatherData2();



