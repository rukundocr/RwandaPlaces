const search = document.getElementById('search')
const wait = document.getElementById('wait');
const match = document.getElementById('match-list')

//search places.json and filter 

const searchpPlaces = async searchtext => {
    wait.innerHTML = "Wait a bit while we are processing your request  ........"
   const res = await fetch('../data/rwandaData.json');
   const places = await res.json();
   //console.log(places);
   //get matches to current text input
  let matches = places.filter(place =>{
      const regex = new RegExp(`^${searchtext}`,'gi');
      return place.Province.match(regex)|| place.District.match(regex)|| place.Sector.match(regex)|| place.Cellule.match(regex) ||
        place.Village.match(regex)


 
  });
  if(searchtext.length === 0){
    matches = []
    match.innerHTML = "" ;
    wait.innerHTML = "";
  }
   outputHtml(matches);
    

};

const outputHtml = matches =>{
    wait.innerHTML = "";
    if(matches.length > 0){
        const html = matches.map(match =>
            `
             <div class= "card card-body mb-1">
              <h4><span class= "text-primary">Province:</span></h4>${match.Province}</h4>
              <h4><span class= "text-primary">District:</span></h4>${match.District}</h4>
              <h4><span class= "text-primary">Sector:</span></h4>${match.Sector}</h4>
              <h4><span class= "text-primary">Cell:</span></h4>${match.Cellule}</h4>
              <h4><span class= "text-primary">Village:</span></h4>${match.Village}</h4>
             </div>
            
            
            `
        ).join('');
        match.innerHTML =html  ;
    }

}

search.addEventListener('keydown',()=> searchpPlaces(search.value))