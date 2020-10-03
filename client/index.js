const fetchAddress = async address => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`);
    return response.json(); 
}

const objEndereco = async () => {
    const endereco = document.querySelector('#endereco').value;
    const response = await fetchAddress(endereco);
    const coordinates = [parseFloat(response[0].lat), parseFloat(response[0].lon)];
    return coordinates;
}

const fetchSunriseSunsetTime = async (coordinates, date) => {
    const url = `http://api.sunrise-sunset.org/json?lat=${coordinates[0]}&lng=${coordinates[1]}&date=${date}`
    const response = await fetch(url);
    return response.json();
}

const sunriseSunsetTime = (responseSunriseSunset) => {
    const sunriseSunsetTime = {
        sunrise : responseSunriseSunset.results.sunrise,
        sunset : responseSunriseSunset. results.sunset,
        dayLength : responseSunriseSunset.results.day_lenght,
        firstLight : responseSunriseSunset.results.civil_twilight_begin,
        lastLight : responseSunriseSunset.results.civil_twilight_end 
    }
    // return sunriseSunsetTime;
    console.log(sunriseSunsetTime)
}

document.querySelector('#search').addEventListener("click", async function(event){
    event.preventDefault();
    sunriseSunsetTime(await fetchSunriseSunsetTime(await objEndereco(), '2020-10-03'))
});

