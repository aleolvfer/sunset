const fetchAddress = async address => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`);
    return response.json(); 
}

const getCoordinates = async () => {
    const address = document.querySelector('#busca-endereco').value;
    const response = await fetchAddress(address);
    const coordinates = [parseFloat(response[0].lat), parseFloat(response[0].lon)];
    return coordinates;
}

const fetchSunriseSunsetTime = async (coordinates) => {
    const objDate = new Date();
    const date = `${objDate.getFullYear()}/${objDate.getMonth()+1}/${objDate.getDate()}`;
    const url = `https://api.sunrise-sunset.org/json?lat=${coordinates[0]}&lng=${coordinates[1]}&date=${date}`
    const response = await fetch(url);
    return response.json();
}

const formatedTime = time => {
    const timezone = { AC: 5, AL: 3, AP: 3, AM: 4, BA: 3, CE: 3, DF: 3, ES: 3, GO: 3, MA: 3, MT: 4, MS: 4, MG: 3,
         PA: 4, PB: 3, PR: 3, PE: 3, PI: 3, RJ: 3, RN: 3, RS: 3, RO: 4, RR: 4, SC: 3, SP: 3, SE: 3, TO: 3, "": 3 };
    const us = document.querySelector('#busca-estado').value;
    let x;
    for(x in timezone){
        if(us.toUpperCase() === x){
        let arrayTime = time.split("");
        arrayTime[0] = (parseInt(arrayTime[0]) - timezone[x]).toString();
        time = arrayTime.join('');
        }
    }    
    return time;
}

const sunriseSunsetTime = (responseSunriseSunset) => {
    const sunriseSunsetTime = {
        sunrise : formatedTime(responseSunriseSunset.results.sunrise),
        sunset : formatedTime(responseSunriseSunset. results.sunset),
        dayLength : responseSunriseSunset.results.day_length,
        firstLight : formatedTime(responseSunriseSunset.results.civil_twilight_begin),
        lastLight : formatedTime(responseSunriseSunset.results.civil_twilight_end)
    }
    return sunriseSunsetTime;
}

const liCreate = object => {
    const li = document.createElement("li");
    li.textContent = object;
    return li;
}


let time = null;
let stateApp = '';
const runApp = async function(event) {
    event.preventDefault();

    clearTimeout(time);
    time = setTimeout(async () => {

        const addressArray = await getCoordinates();
        const log = addressArray.toString();
        
        if(log != stateApp){
            stateApp = addressArray.toString();

            const sunriseSunsetTimeObject = sunriseSunsetTime(await fetchSunriseSunsetTime(addressArray));

            const arrayOfObj = Object.entries(sunriseSunsetTimeObject);
        
            const parametersArray = ['Nascer do Sol ', 'Por do Sol ', 
            'Duração do Dia ', 'Primeira Luz do Dia ', 'Última Luz do dia '];
        
            let cont = 0;
            for(var [key, value] of arrayOfObj){
                let li = parametersArray[cont] + value;
                document.querySelector('#dados').appendChild(liCreate(li));
                cont++;
            }
        }
        
    }, 1000);
}


document.querySelector('#search').addEventListener("click", runApp);
