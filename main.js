

$(function() {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "7144aed56f79b17729c466816622aa0f";
    var quoteUrl = "http://api.forismatic.com/api/1.0/";
    var gifyUrl = "http://api.giphy.com/v1/gifs/search?q=";
    var gifyAPI = "&api_key=dc6zaTOxFJmzC";

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
        wrapper.html('The temperature today in: ' +city + ', ' + state + ' is: ' + convertTo(temp) + '&deg;F and ' + desc + '<i class="owf owf-'+id+'"></i>' );
    }

    function getTemp(temp, id){
        var tempDiv = $('.temp');
        tempDiv.empty();
        tempDiv.html(convertDegrees(temp) + '&deg;F '+ '<i class="owf owf-'+id+'"></i>');
    }

    function notOK(){
        console.log("Oopsie something went wrong here....");
    }

    function convertTo(k){
        return Math.round(k*(9/5)-459.67);
    }

    function convertDegrees(k){
        return Math.round(k*(9/5)+32);
    }



    var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(position) {
            $.getJSON(openWeatherMap, {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                units: 'metric',
                APPID: apiKey
            }).done(function(data) {
                getTemp(data.main.temp, data.weather[0].id);
                console.log(data);
            })
        })
    }


    $('#btn').on('click', function(e){
        getWeather();
        $("input:text").val("");
    });

    $('#searchBtn').on('click', function(e){
        gify();
        $("input:text").val("");
    });




    var quoteUrl = "http://api.forismatic.com/api/1.0/";

    var pullQuote = $.ajax({
        url: quoteUrl,
        jsonp: "jsonp",
        dataType: 'jsonp',
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        },
        success: function(response) {
            getQuote(response.quoteText, response.quoteAuthor);
        },
        error: function(response) {
            console.log(JSON.stringify(response));
        }
    });

    function getQuote(quote, author){
        $('#quote').html('"'+ quote + '" - ' + author);
    }


});



