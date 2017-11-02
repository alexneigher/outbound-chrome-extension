$(function(){
  //fetch a random page's worth of adventures
  random_page = Math.floor(Math.random() * 20)

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.theoutbound.com/api/adventures?page="+random_page+"", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      //if the user has already logged into the outbound, you get data
      fetchLoggedInData(xhr.response);

      //else we've never seen you before, update with random hard coded and prompt to login
      //renderNotLoggedIn(xhr);
    }
  }
  xhr.send();
});


function fetchLoggedInData(response){
  response_json = JSON.parse(response);

  //pull a random adventure from the set 
  random_index =  Math.floor(Math.random() * response_json.length)
  adventure = response_json[random_index];

  console.log(adventure);

  adventure_name = adventure["name"];
  renderAdventureName(adventure_name);

  adventure_image = adventure["images"][0]
  renderAdventureImage(adventure_image);

  adventure_link = adventure["path"];
  renderAdventureLink(adventure_link);
}



function renderAdventureName(adventure_name){
  $("#adventure-name").html(adventure_name);
}

function renderAdventureImage(adventure_image){
  $("body").attr('style', 'background-image:url("'+adventure_image+'")');
}

function renderAdventureLink(adventure_link){
  $('#adventure-link').attr('href', "https://www.theoutbound.com/" + adventure_link);
}