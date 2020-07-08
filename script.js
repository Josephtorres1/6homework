$("#submit").on("click", function (event) {
  event.preventDefault();
  console.log("l3");
  queryURL = buildQuery();

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // response is an object with keys "city" and "list".
    // "list" is an array of objects, each of which describe the weather for a certain day (hour?) in that city
    // in the list, temps are at list.[index].main and are all in kelvins
  });
});
function buildQuery() {
  // admit no arguments, grab value of input field, return finished URL
  var newquery = "https://api.openweathermap.org/data/2.5/weather?q=";
  // grab value of input
  var city = $("#city").val();
  // add it to string with "+="
  newquery += city;
  newquery += "&appid=4766d1ec478d4947b8d2f92100a76684";
  console.log(newquery);
  return newquery;
}
