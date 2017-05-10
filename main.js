

$(function() {
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
	var apiKey = "7144aed56f79b17729c466816622aa0f";

	function getWeather(city, state){
		city = $("#city").val().toLowerCase();
		state = $('#state').val().toUpperCase();	
		$.ajax({
			url: weatherUrl + city + ",us&APPID=" + apiKey,
			success: function(data){
				aOK(data.name,state,data.main.temp,data.weather[0].description,data.weather[0].id);	
			},
			error: function () {
               notOK();
            }
		});
	}

	function aOK(city, state, temp, desc, id){
		var wrapper = $(".weather");
		wrapper.empty();
		wrapper.html(city + ', ' + state + ' is: ' + convertTo(temp) + '&deg;F and ' + desc + '<i class="owf owf-'+id+'"></i>' );
	}

	function notOK(){
		console.log("Oopsie something went wrong here....");
	}

	function convertTo(k){
		return Math.round(k*(9/5)-459.67);
	}

	$('#btn').on('click', function(e){
		getWeather();
		$("input:text").val("");
	});


});


