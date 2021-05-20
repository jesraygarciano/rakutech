var ourRequest = new XMLHTTPRequest();

ourRequest.open("GET", "https://www.reddit.com/r/aww.json");
ourRequest.onload = function (){
    console.log(ourRequest.responseText);
};
ourRequest.send();