const axios = require('axios').default;


function fetchAllCoordsEvery4(){
    var networkPromise = axios.get('http://localhost:7071/api/HttpTrigger1?getLatLong')
                        .then(function(response){
                            const { data } = response;
                            console.log(data.LatLong);
                            console.log(response);
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
    fetchAllCoordsEvery4();
  }
