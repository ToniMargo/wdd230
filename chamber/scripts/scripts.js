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
