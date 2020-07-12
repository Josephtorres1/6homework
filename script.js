var selectpresent;
// gottta find some way to determine if the selectmenu is even existent.
// would $("#selectmenu") only make it if it didnt exist yet and otherwise select it?

$("#submit").on("click", function (event) {
  event.preventDefault();
  coordQueryURL = buildCoordQuery();
  var lat;
  var lon;
  // store the city in the local data

  // do the first call to get the coordinates of the city
  $.ajax({
    url: coordQueryURL,
    method: "GET",
  }).then(function (response) {
    lat = response.coord.lat;
    lon = response.coord.lon;
    var onecallQueryURL = buildOnecallQuery(lat, lon);
    // second call to get the onecall daily forecast
    $.ajax({
      url: onecallQueryURL,
      method: "GET",
    }).then(function (response) {
      fiveday(response.daily);
    });
    currentweather(response);
  });
});

function buildCoordQuery() {
  // admit no arguments, grab value of input field, return finished URL
  var newquery = "https://api.openweathermap.org/data/2.5/weather?q=";
  // grab value of input
  var city = $("#city").val();
  // add it to string with "+="
  newquery += city;
  newquery += "&units=imperial&appid=4766d1ec478d4947b8d2f92100a76684";
  return newquery;
}

function buildOnecallQuery(lat, lon) {
  var newquery =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=4766d1ec478d4947b8d2f92100a76684";
  return newquery;
}

function convertDate(unixdate) {
  var normalDate = new Date(unixdate * 1000).toLocaleDateString();
  return normalDate;
}

function currentweather(responseobj) {
  console.log("The object containing today's weather:");
  console.log(responseobj);
}

function fiveday(dailyobj) {
  console.log("The object containing all the days this week:");
  console.log(dailyobj);
  for (let day = 1; day < 6; day++) {
    console.log(dailyobj[day]);
    var nowday = dailyobj[day];
    createdailycard(nowday);
  }
}

function createdailycard(day) {
  var daycard = $("<div>").addClass("day-card");
  var imgdiv = $("<div>").addClass("weather-thumbnail");
  var weatherimg = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png"
  );
  imgdiv.append(weatherimg);
  daycard.append(imgdiv);
  var dateheader = $("<h2>").addClass("card-date");
  dateheader.text(convertDate(day.dt));
  daycard.append(dateheader);
  var tempspan = $("<span>").addClass("card-info card-temp");
  tempspan.text("Temp: " + day.temp.day);
  daycard.append(tempspan);
  var humidspan = $("<span>").addClass("card-info card-humid");
  humidspan.text("Humidity: " + day.humidity);
  daycard.append(humidspan);
  $("#five-day-forecast").append(daycard);
}
// function needs to make this
// <div class="day-card">
//   <div class="weather-thumbnail">
//     <img src="https://placehold.it/180x180" />
//   </div>
//   <h2 class="card-date">Product Name</h2>
//   <span class="card-info card-temp">Temperature</span>
//   <span class="card-info card-precip">Chance of Precipitation</span>
// </div>
