function _handleErrors(res){
    if(!res.ok) throw new Error(res.statusText + "ErrorOpenStreetMapAPI");
    return res;
}

const fetchEndereco = async endereco => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search/?q=${endereco}&format=json`);
    return response.json(); 
}

const objEndereco = async () => {
    const endereco = document.querySelector('#endereco').value;
    const objetoComDadosDoEndereco = await fetchEndereco(endereco);
    console.log(objetoComDadosDoEndereco);
}

document.querySelector('#search').addEventListener("click", function(event){
    event.preventDefault();
    objEndereco();
});





// fetch("https://www.potterapi.com/v1/characters?key=$2a$10$e5F22Rwiu/Ysm62jg9Yx3er/xz7TppSb82QKTTS3lRmikLTddM/GC")
//     .then( res => _handleErrors(res))
//     .then( res => res.json())
//     .then( json => {
//         console.log(json[109]);
//     });

