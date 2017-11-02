$(function(){
  //fetch a random page's worth of adventures
  random_page = Math.floor(Math.random() * 20)

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.theoutbound.com/api/adventures?page="+random_page+"", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      //if the user has already logged into the outbound, you get data
      fetchLoggedInData(xhr.response);

    }else{
      fetchNonLoggedInData(xhr);
    }
  }
  xhr.send();
});

//generate some random content to prompt the user to log into the outbound
function fetchNonLoggedInData(response){
  renderAdventureName('Want great content delivered daily to your new tabs?');
  renderAdventureImage(randomImageUrl());
  renderAdventureLink('/users/sign_in');
}

// because they're authenticated, show real data
function fetchLoggedInData(response){
  response_json = JSON.parse(response);

  //pull a random adventure from the set
  random_index =  Math.floor(Math.random() * response_json.length)
  adventure = response_json[random_index];

  // for debugging
  console.log(adventure);

  adventure_name = adventure["name"];
  renderAdventureName(adventure_name);

  adventure_image = adventure["images"][0]
  renderAdventureImage(adventure_image);

  adventure_location = adventure['destination']['formatted_location'];
  renderAdventureLocation(adventure_location);

  adventure_link = adventure["path"];
  renderAdventureLink(adventure_link);
}


function renderAdventureLocation(adventure_location){
  $("#adventure-location").html(adventure_location);
}

function renderAdventureName(adventure_name){
  $("#adventure-name").html(adventure_name);
}

function renderAdventureImage(adventure_image){
  $("body").attr('style', 'background-image:url("'+adventure_image+'fm=pjpg&auto=format&w=1500")');
}

function renderAdventureLink(adventure_link){
  $('#adventure-link').attr('href', "https://www.theoutbound.com/" + adventure_link);
}

function randomImageUrl(){
  var images = [
    "https://www.theoutbound.com/assets/background_images/home-mtn-23f40cd56a9cc83dd2e1db77d04acf93f0403d7d7111bad02ac1824360c6780a.jpg",
    "https://images.theoutbound.com/uploads/1508264320434/c2gs3e69sc/2a06774847564f699ae464f5a4aa1d2a?w=1200&h=630&fit=crop",
    "https://images.theoutbound.com/groups/170800/assets/1498446073209?w=900&fit=crop&auto=format&q=50&dpr=2"
  ]

  index = Math.floor(Math.random() * images.length);

  return images[index];
}
