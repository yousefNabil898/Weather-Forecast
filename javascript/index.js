var input = document.querySelector('input')
var home = document.querySelector('.home')
var btn = document.querySelector('button')
var err = document.querySelector('.error-msg')
var load = document.querySelector('.loading-msg')
var allDays = [];
var city;


async function getData(location) {
    load.classList.remove('d-none')
    try {
        allDays = []
        if (typeof location === "string") {
            city = location 
            api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfca9519249943bca9f195258241606&q=${city}&days=3`);
        } else {
            const { latitude, longitude } = location.coords;
            api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfca9519249943bca9f195258241606&q=${latitude},${longitude}&days=3`);
        }
        load.classList.add('d-none')
        var data = await api.json()
        forecast = data.forecast.forecastday


        function getDayOfWeek(dateString) {
            let date = new Date(dateString);
            let options = { weekday: 'long' };
            let dayOfWeek = date.toLocaleDateString('EN-us', options);
            return dayOfWeek;
        }


        var fristDay = {
            // currunt day data
            fristDayName: getDayOfWeek(forecast[0].date),
            fristDayicon: forecast[0].day.condition.icon,
            fristDaydate: forecast[0].date,
            cityName: data.location.name,
            cityText: data.current.condition.text,
            cityIcon: data.current.condition.icon,
            temp_c: data.current.temp_c,
            time: data.current.is_day,


        }
        // next day data
        var secondDay = {

            secondDayName: getDayOfWeek(forecast[1].date),
            secondDayText: forecast[1].day.condition.text,
            secondDayicon: forecast[1].day.condition.icon,
            secondMaxtemp: forecast[1].day.maxtemp_c,
            secondMintemp: forecast[1].day.mintemp_c,
            secondDaydate: forecast[1].date,


        }
        // therd day data
        var therdDay = {

            therdDayName: getDayOfWeek(forecast[2].date),
            therdDayText: forecast[2].day.condition.text,
            therdDayicon: forecast[2].day.condition.icon,
            therdMaxtemp: forecast[2].day.maxtemp_c,
            therdMintemp: forecast[2].day.mintemp_c,
            therdDaydate: forecast[2].date,



        }

        err.classList.add('d-none')
        allDays.push(fristDay)
        allDays.push(secondDay)
        allDays.push(therdDay)
        if (fristDay.time == 0) {
            home.classList.remove('main-morning')
            home.classList.add("main-night")

        } else {
            home.classList.remove('main-night')
            home.classList.add("main-morning")
        }
        display()
    } catch (error) {
        // load.classList.add('d-none')
        // err.classList.remove('d-none')

    }

}
function display() {
    var cartona = ` <div class=" col-lg-3 col-md-4 ">
                <div class="card mt-3  p-4 pt-5 pb-5 d-flex justify-content-center align-items-center">
                   
                    <h2 class="h5">${allDays[0].fristDayName}</h2>
                    <img src=${"https:" + allDays[0].cityIcon} alt="" class="w-25">
                    <div class="w-100 text-center">
                            <p class="h5">${allDays[0].cityText}</p>
                        <p class="temp-1">${allDays[0].temp_c}<span class="frist-d">o</span>c</p>
                        <div class="w-100 d-flex justify-content-between align-items-center mt-3">
                         <p class="h6">${allDays[0].cityName}</p>
                         <p class="h6">${allDays[0].fristDaydate}</p>
                        </div>
                    </div>
                </div>
            </div><div class=" col-lg-3 col-md-4 ">
                <div class="card mt-3  p-4 pt-5 pb-5 d-flex justify-content-center align-items-center">
                   
                    <h2 class="h5">${allDays[1].secondDayName}</h2>
                    <img src=${"https:" + allDays[1].secondDayicon} alt="" class="w-25">
                    <div class="w-100 text-center">
                            <p class="h5">${allDays[1].secondDayText}</p>
                           
                        <p class="temp-max">${allDays[1].secondMaxtemp}<span class="second-d"> o</span>c</p>
                        <p class="temp-min">${allDays[1].secondMintemp}<span class="therd-d">o</span>c</p>
                         <p class="h6 mt-3">${allDays[1].secondDaydate}</p>
                    </div>
                </div>
                </div>
                <div class=" col-lg-3 col-md-4 ">
                <div class="card mt-3  p-4 pt-5 pb-5 d-flex justify-content-center align-items-center">
                   
                    <h2 class="h5">${allDays[2].therdDayName}</h2>
                    <img src=${"https:" + allDays[2].therdDayicon} alt="" class="w-25">
                    <div class="w-100 text-center">
                            <p class="h5">${allDays[2].therdDayText}</p>
                           
                        <p class="temp-max">${allDays[2].therdMaxtemp}<span class="second-d">o</span>c</p>
                        <p class="temp-min">${allDays[2].therdMintemp}<span class="therd-d"> o</span>c</p>
                         <p class="h6 mt-3">${allDays[2].therdDaydate}</p>
                    </div>
                </div>
                </div>
           `

    document.querySelector('.row').innerHTML = cartona
}

if (city === undefined) {
    city = "cairo"
    getData(city)
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getData);
}
input.addEventListener('input', function () {

    city = input.value;
    getData(city);

}
);
btn.addEventListener('click', function () {
    city = input.value;
    getData(city);
})

