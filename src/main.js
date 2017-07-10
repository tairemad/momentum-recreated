//vanilla js version using es6 features

const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "7144aed56f79b17729c466816622aa0f";
const quoteUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1";
const gifyUrl = "http://api.giphy.com/v1/gifs/search?q=";
const gifyAPI = "&api_key=dc6zaTOxFJmzC";
const weatherBtn = document.getElementById('btn');
const gifBtn = document.getElementById('searchBtn');


function convertTo(k){
    return Math.round(k*(9/5)-459.67);
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//event listener to get the weather once button is clicked
weatherBtn.addEventListener('click', () => {
    let cityValue = document.getElementById('city').value;
    let stateValue = document.getElementById('state').value;

    function aOK(city, state, temp, desc, id){
        const wrapper = document.getElementById('weather');
        wrapper.innerHTML = `The temperature today in ${city}, ${state} is: ${convertTo(temp)}&deg;F and ${desc} <i class="owf owf-${id}"></i> `;
    }
    (function getWeather(city, state){
            city = cityValue.toLowerCase();
            state = stateValue.toUpperCase();
            const url = `${weatherUrl}${city},us&APPID=${apiKey}`;
            fetch(url).then(response => response.json())
                .then(data => aOK(data.name,state,data.main.temp,data.weather[0].description,data.weather[0].id))
                .catch(error => console.log(error));
        })();
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
});

//event listner to pull the gifs based on the search criteria on button click
gifBtn.addEventListener('click', () =>{
    let search = document.getElementById('gifSearch').value.toLowerCase().trim().replace(/ /g, "+");
    const gifDiv = document.getElementById('gifs');
    let random = getRandomNum(1,30);
    let gifUrl = `${gifyUrl}${search}&limit=4&rating=pg&offset=${random}${gifyAPI}`;
    gifDiv.innerHTML = '';

    function displayGifs(gifs){
        const eachGif = [...new Set(gifs.data.map(item => item.images.fixed_height.url))];
        eachGif.forEach(gif => {
            gifDiv.innerHTML += `<div class="col-md-3"><img src="${gif}"></div>`;
        });
    }

    fetch(gifUrl).then(response => response.json())
     .then(data => console.log(displayGifs(data)))
     .catch(error => console.log(error));

});

//iife to display the current time as well as show current date in the corner
(function displayTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthsOfYear = ['January', 'February','March',' April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todaysDate = date.getDate();
    const todaysDay = date.getDay();
    const hour = date.getHours() % 12 || 12;
    let minutes = date.getMinutes();

    function currentMinutes(i){
        if (i<10){
            i = "0" + i;
        }
        return i;
    }

    minutes = currentMinutes(minutes);
    let currentTime = `${hour}:${minutes}`;
    document.getElementById('time').innerHTML= currentTime ;
    document.getElementById('date').innerHTML = `${days[todaysDay]} <br> ${monthsOfYear[month]} ${todaysDate}, ${year}`;
    let time = setTimeout(displayTime, 500);
})();

//functions to randomly display quote and author
function getQuote(quoteTxt, author){
    const quotediv = document.getElementById('quote');
    quotediv.innerHTML = `"${quoteTxt}" - ${author}`;
}

(function pullQuote() {
    fetch(quoteUrl, {
        headers: {
        'X-Mashape-Authorization': 'sdKgjJSSlXmshzOqmbSsIRuD7wbAp11NjnXjsnf3z2W1nJYePi'
    }}).then(response => response.json())
        .then(data =>getQuote(data.quote, data.author))
        .catch(error => console.log(error));
})();


//taking geoloction to get the temp where the user is located based on whether they allowed geolocation to show
function getTemp(temp, id){
    const tempDiv = document.getElementById('temp');
    tempDiv.innerHTML = `${convertTo(temp)}&deg;F <i class="owf owf-${id}"></i>`;
}

(function () {
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const geoWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&appid=${apiKey}`;
            fetch(geoWeather).then(response => response.json())
            .then(data => getTemp(data.main.temp, data.weather[0].id))
            .catch(error => console.log(error));

        });
    }
})();

