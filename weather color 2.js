let weatherData;
let weatherColors = {  // Colors for each weather group
  "2xx": [128, 0, 128],    // Thunderstorm: Purple
  "3xx": [0, 128, 128],    // Drizzle: Teal
  "5xx": [0, 0, 255],      // Rain: Blue
  "6xx": [255, 255, 255],  // Snow: White
  "7xx": [128, 128, 128],  // Atmosphere: Gray
  "800": [255, 255, 0],    // Clear: Yellow
  "80x": [0, 255, 0]       // Clouds: Green
};
let noiseOffset = 0;
let colors = [[200, 200, 200], [200, 200, 200], [200, 200, 200]]; // Default colors for each hour

let API_key = "226fbb9dacb884f50a64b69dffdb7c25";
let url = "https://api.openweathermap.org/data/3.0/onecall?lat=51.02&lon=0.12&appid=" + API_key;

function setup() {
  createCanvas(600, 400);
  fetchWeather();
}

function fetchWeather() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      determineColors();
    })
    .catch(err => {
      console.error("Error fetching data", err);
    });
}

function determineColors() {
  if (!weatherData || !weatherData.hourly || weatherData.hourly.length < 4) {
    console.error("Insufficient data");
    return;
  }

  for (let hour = 1; hour <= 3; hour++) {
    let weatherId = weatherData.hourly[hour].weather[0].id;
    let group = Math.floor(weatherId / 100) + "xx";
    if (weatherId === 800) group = "800";
    else if (weatherId >= 801 && weatherId <= 804) group = "80x";

    colors[hour - 1] = weatherColors[group] || [0, 0, 0]; // Default to black if group is unknown
  }
}

function draw() {
  background(200);

  noiseOffset += 0.01;
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let noiseVal = noise(x * 0.02 + noiseOffset, y * 0.02 + noiseOffset);
      let section = Math.floor(x / (width / 3)); // Determine which section
      let color = colors[section];
      fill(color[0] * noiseVal, color[1] * noiseVal, color[2] * noiseVal);
      rect(x, y, 10, 10);
    }
  }
}
