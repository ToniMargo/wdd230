// Get current year and put it in the footer
document.querySelector("#date1").textContent = new Date().getFullYear();

// Get the last modification date and put it in the footer
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;



// select the elements to manipulate (output to)
const datefieldUK = document.querySelector(".todayDate"); // for european/family history format with day first.

// derive the current date using a date object
const now = new Date();
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);
// long, medium, short options ... try them

datefieldUK.innerHTML = fulldateUK;

// display meeting banner if today is Monday or Tuesday
const meetingBanner = document.querySelector('#meetingBanner');
if(now.getDay() == 1 || now.getDay() == 2) {
    meetingBanner.setAttribute('class', 'visible');
}

//Lazyload images
//----------------------------------------------------------------------------
const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }

    img.src = src;
    img.removeAttribute("data-src");
} 

const imgOptions = {
    threshold: 1,
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});
//----------------------------------------------------------------------------

//Local Storage Visit Counter (All credits to Dean: https://codepen.io/josdea/pen/qaZgyJ)

function isLocalStorageSupported(){
    if (typeof Storage !== "undefined")
      //local storage is supported
      return true;
    else{
      //local storage is not supported
      return false;
    }
  }
  
  function doesVariableExist(x){
    if (localStorage[x]) {
      return true;
    }else{
      return false;
    }
  }
  
  function createStorageVariable(x, value){
    localStorage[x] = value
    return localStorage[x]
  }
  
  if (isLocalStorageSupported){
    if(doesVariableExist('test')){
      localStorage.test = Number(localStorage.test) + 1
    }else{
      localStorage.test = 1
    }
    console.log(localStorage.test)
  }
  // localStorage.clear()
  if (typeof Storage !== "undefined") {
    //Local storage is supported
    if (localStorage.visitcount) {
      // variable exists for this site they've been here before so do things
      document.getElementById("visitCounter").innerHTML =
        "Hello there, you've been here " +
        localStorage.visitcount +
        " times before.";
      localStorage.visitcount = Number(localStorage.visitcount) + 1; //update variable for existing users
    } else {
      // variable not found they haven't been here before
      localStorage.visitcount = 1; //set initial value of variable for this site and then do things for first time
      document.getElementById("visitCounter").innerHTML =
        "This is your first time here! Welcome to the Discovery page.";
    }
  } else {
    // their browser doesn't support local storage so let them know or just do nothing
    alert(
      "Sorry, your browser does not support web storage.  Changes will not be saved"
    );
    document.getElementById("visitCounter").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
  
  // console.log("localstorage visit count now: " + localStorage.visitcount);
  
  // localStorage.clear();