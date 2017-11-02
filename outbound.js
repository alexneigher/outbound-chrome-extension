$(function(){
  //bind space bar for refresh
  $('body').keyup(function(e){
    if(e.keyCode == 32){
      location.reload();
    }
  });
  //fetch a random page's worth of adventures
  random_page = Math.floor(Math.random() * 20)

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.theoutbound.com/api/adventures?limit=7&page="+random_page+"", true);
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
  renderAdventureLocation('Log In to your Outbound Collective account!');
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
  $('#adventure-link').attr('href', "https://www.theoutbound.com" + adventure_link);
}

function randomImageUrl(){
  var images = [
    "https://images.theoutbound.com/uploads/1444186865519/e4s555pz6a65stt9/74e264315a778b5ecf22f5e05f63ede3?auto=format&q=90&w=1500&dpr=2",
    "https://images.theoutbound.com/uploads/1417476401589/twnl9d0840nng66r/76f3bbeb3f68831e6a0793ecffd1397f?auto=format&q=90&w=1500&dpr=2",
    "https://images.theoutbound.com/adventures/101252/assets/1413575406756?&auto=format&dpr=2",
    "https://images.theoutbound.com/uploads/1422849919543/yvj8hz8eogu2qpvi/d5b074ebc35303af6b253b11569f5b57?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/contents/111813/assets/1477758335472?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/contents/109990/assets/1460902536393?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/contents/109372/assets/1460425944949?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/uploads/1468359750980/x3q3b1h1utehlmtz/944c22d099e202310c648d4d3fe36c8a?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/uploads/1480219553534/wdv3jltrkgqefu9d/9cc524d4ccc9e97214d76c15dcf95668?h=420&auto=format&q=50&h=600&w=900&dpr=2",
    "https://images.theoutbound.com/uploads/1456634856010/u79u91d1w3njnhfr/892a799cc0945096e0983fde66f74de9?h=420&auto=format&q=50&h=600&w=900&dpr=2"
  ]

  index = Math.floor(Math.random() * images.length);

  return images[index];
}
