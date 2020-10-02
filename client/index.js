function _handleErrors(res){
    if(!res.ok) throw new Error(res.statusText + "ErrorOpenStreetMapAPI");
    return res;
}

document.querySelector('#search').addEventListener("click", function(event){
    event.preventDefault();
    
    const endereco = document.querySelector('#endereco').value;

    const url = `https://nominatim.openstreetmap.org/search/?q=${endereco}&format=json`;

    return fetch(url)
    .then( res => _handleErrors(res))
    .then( res => res.json())
    .then( json => json);
});






// fetch("https://www.potterapi.com/v1/characters?key=$2a$10$e5F22Rwiu/Ysm62jg9Yx3er/xz7TppSb82QKTTS3lRmikLTddM/GC")
//     .then( res => _handleErrors(res))
//     .then( res => res.json())
//     .then( json => {
//         console.log(json[109]);
//     });

