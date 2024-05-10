const overpassUrl = 'http://overpass-api.de/api/interpreter';
const overpassQuery = `
    [out:json];
    area["ISO3166-1"="AR"][admin_level=2];
    (node["place"="state"](area);
     way["place"="state"](area);
     rel["place"="state"](area););
    out center;
`;

console.log('buscando!');
fetch(overpassUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        data: overpassQuery
    })
})
.then(response => response.json())
.then(data => {
    console.log("Provincias de Argentina:");
    data.elements.forEach(element => {
        if (element.tags && element.tags.name) {
            console.log(element.tags.name);
        }
    });
})
.catch(error => {
    console.error('Error al recuperar datos:', error);
});