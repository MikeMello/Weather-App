window.addEventListener("load",()=> {
  let long;
  let lat;
  const tempDescription = document.querySelector('.temperature-description');
  const tempDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const tempSection = document.querySelector('.temperature');
  const tempSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/27695c1ca18e9def41b7be708cad2981/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //set DOM elements from the API
          tempDegree.textContent=temperature;
          tempDescription.textContent=summary;
          locationTimezone.textContent=data.timezone;
          //Formula for celsius
          let celsius = (temperature - 32) * (5/9);

          //Set Icon
          setIcons(icon, document.querySelector('.icon'));

          //change temperature to Celsius/Fahrenheit
          tempSection.addEventListener('click', () => {
            if(tempSpan.textContent === "F"){
              tempSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celsius);
            } else{
              tempSpan.textContent = "F";
              tempDegree.textContent = Math.floor(temperature);
            }
          })
        });
    });
  }

  function setIcons(icon, iconID ){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); /*looks for a line(-) in the api data and
     replaces it with an underscore(_) so it matches with the skyicon data*/
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
  }
});
