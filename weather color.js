let weatherData;
let weatherType = "loading...";
let showWeather = false; // Controls whether to display the weather
let button1, button2, button3; // Button elements
let timer = 0; // Tracks when to hide the weather again
let forecastHour = 0; // Determines which hour's forecast to display
let weatherGroupColor = {  // Colors for each weather group
  "2xx": [128, 0, 128],    // Thunderstorm: Purple
  "3xx": [0, 128, 128],    // Drizzle: Teal
  "5xx": [0, 0, 255],      // Rain: Blue
  "6xx": [255, 255, 255],  // Snow: White
  "7xx": [128, 128, 128],  // Atmosphere: Gray
  "800": [255, 255, 0],    // Clear: Yellow
  "80x": [0, 255, 0]       // Clouds: Green
};
let noiseOffset = 0;
let currentColor = [200, 200, 200]; // Default color for background

let API_key = "226fbb9dacb884f50a64b69dffdb7c25";
let url = "https://api.openweathermap.org/data/3.0/onecall?lat=51.02&lon=0.12&appid=" + API_key;

function setup() {
  createCanvas(600, 400);

  // Create buttons and set their properties
  button1 = createButton("Check Weather (1 Hour Later)");
  button1.position(width / 2 - 150, height / 2 - 20);
  button1.mousePressed(() => handleButtonPress(1));

  button2 = createButton("Check Weather (2 Hours Later)");
  button2.position(width / 2 - 150, height / 2 + 20);
  button2.mousePressed(() => handleButtonPress(2));

  button3 = createButton("Check Weather (3 Hours Later)");
  button3.position(width / 2 - 150, height / 2 + 60);
  button3.mousePressed(() => handleButtonPress(3));
}

function fetchWeather(hour) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      weatherData = data;
      determineWeather(hour);
      showWeather = true; // Show the weather for two seconds
      timer = millis(); // Record the current time
    })
    .catch(err => {
      weatherType = "Error fetching data";
      showWeather = true;
      timer = millis();
    });
}

function determineWeather(hour) {
  if (!weatherData || !weatherData.hourly || weatherData.hourly.length < hour + 1) {
    weatherType = "Data unavailable";
    return;
  }

  // Access the weather for the specified hour later
  let weatherId = weatherData.hourly[hour].weather[0].id;
  weatherType = weatherData.hourly[hour].weather[0].description; // Use the API's weather description

  // Determine color based on weather group
  let group = Math.floor(weatherId / 100) + "xx";
  if (weatherId === 800) group = "800";
  else if (weatherId >= 801 && weatherId <= 804) group = "80x";

  currentColor = weatherGroupColor[group] || [0, 0, 0]; // Default to black if group is unknown
}

function handleButtonPress(hour) {
  forecastHour = hour;
  fetchWeather(hour); // Fetch weather data for the specified hour when the button is pressed
}

function draw() {
  background(200);

  // Draw moving noise with the appropriate weather color
  noiseOffset += 0.01;
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let noiseVal = noise(x * 0.02 + noiseOffset, y * 0.02 + noiseOffset);
      fill(currentColor[0] * noiseVal, currentColor[1] * noiseVal, currentColor[2] * noiseVal);
      rect(x, y, 10, 10);
    }
  }

  if (showWeather) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);

    // Display the weather type
    text(`${forecastHour} hour(s) later: ${weatherType.toUpperCase()}!`, width / 2, height / 2 + 100);

    // Hide the weather after 2 seconds
    if (millis() - timer > 2000) {
      showWeather = false;
    }
  }
}
