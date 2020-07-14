var citynum = 0;
for (let key = 0; key < localStorage.length; key++) {
  createcitybtn(localStorage.getItem(key));
  citynum++;
}

$("#submit").on("click", function (event) {
  event.preventDefault();
  $("#five-day-forecast").empty();
  $("#weather-today").empty();
  coordQueryURL = buildCoordQuery($("#city").val());
  var lat;
  var lon;
  // store the city in the local data
  addcity($("#city").val());
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

function buildCoordQuery(city) {
  // admits one argument, return finished URL
  var newquery = "https://api.openweathermap.org/data/2.5/weather?q=";
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

function currentweather(res) {
  var daycard = $("<div>").addClass("day-card");
  var imgdiv = $("<div>").addClass("weather-thumbnail");
  var weatherimg = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png"
  );
  imgdiv.append(weatherimg);
  daycard.append(imgdiv);
  var dateheader = $("<h2>").addClass("card-date");
  dateheader.text("Current Weather");
  daycard.append(dateheader);
  var tempspan = $("<span>").addClass("card-info card-temp");
  tempspan.text("Temp: " + res.main.temp);
  daycard.append(tempspan);
  var humidspan = $("<span>").addClass("card-info card-humid");
  humidspan.text("Humidity: " + res.main.humidity);
  daycard.append(humidspan);
  $("#weather-today").append(daycard);
}

function fiveday(dailyobj) {
  for (let day = 1; day < 6; day++) {
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

function addcity(cityname) {
  localStorage.setItem(citynum, cityname);
  console.log(citynum, cityname);
  createcitybtn(cityname);
  citynum++;
}

// this function can also be used to populate list from localstorage
function createcitybtn(city) {
  var citybutton = $("<button>").addClass("citybutton button");
  citybutton.text(city);
  $("#citylist").append(citybutton);
  $("#citylist").append("<br />");
}

function displayweather(selectedcity) {
  $("#five-day-forecast").empty();
  $("#weather-today").empty();
  coordQueryURL = buildCoordQuery(selectedcity);
  var lat;
  var lon;
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
}

$(".citybutton").on("click", function (event) {
  displayweather($(this).text());
});
