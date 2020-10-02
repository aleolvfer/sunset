const fetchEndereco = async endereco => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search/?q=${endereco}&format=json`);
    return response.json(); 
}

const objEndereco = async () => {
    const endereco = document.querySelector('#endereco').value;
    const response = await fetchEndereco(endereco);
    const objetoComDadosDoEndereco = response[0];
    const coordenadas = [parseFloat(objetoComDadosDoEndereco.lat), parseFloat(objetoComDadosDoEndereco.lon)];
    return coordenadas;
}

const fetchSunriseSunset = async (coordenadas, date) => {
    const url = `http://api.sunrise-sunset.org/json?lat=${coordenadas[0]}&lng=${coordenadas[1]}&date=${date}`
    const response = await fetch(url);
    console.log(await response.json());
}

document.querySelector('#search').addEventListener("click", async function(event){
    event.preventDefault();
    fetchSunriseSunset(await objEndereco(), '2020-10-01');
});

