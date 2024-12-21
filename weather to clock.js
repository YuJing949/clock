let weatherData;
let weatherType = "loading...";
let showWeather = false;
let button;
let timer = 0;

let API_key = "226fbb9dacb884f50a64b69dffdb7c25";
let url = "https://api.openweathermap.org/data/3.0/onecall?lat=51.02&lon=0.12&appid=" + API_key;

function setup() {
  createCanvas(600, 400);

  button = createButton("Check Weather (1 Hour Later)");
  button.position(width / 2 - 100, height / 2 - 20);
  button.mousePressed(handleButtonPress);
}

function fetchWeather() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      determineWeather();
      showWeather = true;
      timer = millis();
    })
    
}

function determineWeather() {
  if (!weatherData || !weatherData.hourly || weatherData.hourly.length < 2) {
    weatherType = "Data unavailable";
    return;
  }

  weatherType = weatherData.hourly[1].weather[0].description;
}

function handleButtonPress() {
  fetchWeather();
}

function draw() {
  background(200);

  if (showWeather) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);

    text(`One hour later: ${weatherType.toUpperCase()}!`, width / 2, height / 2 + 50);

    if (millis() - timer > 2000) {
      showWeather = false;
    }
  }
}
