var things_i_do = [
  "feasting on <a href='http://www.urbanspoon.com/f/332/46139/Winnipeg/Sushi-Restaurants'>sushi</a>",
  "making lattes",
  "playing games on <a href='http://steamcommunity.com/profiles/76561198080788913/'>Steam</a>",
  "reading <a href='http://feedly.com/'>blogs</a>",
  "reading <a href='https://readmill.com/florida_elago'>books</a>",
  "chilling in local coffee shops",
  "learning japanese",
  "learning more stuff about programming",
  "discovering new things that interests me",
  "singing in the shower",
  "playing guitar",
  "binge watching on <a href='http://netflix.com'>Netflix</a>",
  "learning new programming languages",
  "teaching programming to beginners",
  "exploring Vancouver, BC",
  "teaching programming at Kodermine",
  "learning functional programming",
  "obsessing over BMO",
  "making weird faces in <a href='http://chat.meatspac.es'>meatspace</a>",
  "in <a href='http://chat.meatspac.es'>meatspace</a>",
  "mentoring at <a href='http://ladieslearningcode.com/'>Ladies Learning Code</a>",
  "making random gifs",
  "staining coffee cups for <a href='http://coffeecupstain.tumblr.com'>art</a>",
  "glitching images on <a href='http://revisit.link'>revisit.link</a>"
];

function display_things_i_do() {
  what_i_do = things_i_do[Math.floor(Math.random() * things_i_do.length)];
  document.getElementById("what_i_do").innerHTML = what_i_do;
  setBackgroundImage();
}

function setBackgroundImage() {
  var image_random_number = Math.floor((Math.random() * 26) + 1);
  var imageHolder = document.getElementById("floating-image")

  imageHolder.style.backgroundImage = "url(images/image_" + image_random_number + ".gif)";
}


document.getElementById("what_i_do").addEventListener("click", function(){
  display_things_i_do();
  ga('send', 'event', 'description', 'click', 'what i do');
}, false);

display_things_i_do();

document.addEventListener("touchstart", function(){}, true);
