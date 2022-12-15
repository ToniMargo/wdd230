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
    });
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});
//----------------------------------------------------------------------------

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
  localStorage[x] = value;
  return localStorage[x];
}

// Index.html
if(window.location.pathname === "/index.html" || window.location.pathname === "/") {
  if (isLocalStorageSupported){
    if(doesVariableExist('test')){
      localStorage.test = Number(localStorage.test) + 1;
    }else{
      localStorage.test = 1;
    }
    //console.log(localStorage.test)
  }
  //localStorage.clear()
  if (typeof Storage !== "undefined") {
    //Local storage is supported
    if (localStorage.drinkCount) {
      document.querySelector('#drinkCounter').innerHTML = localStorage.drinkCount; 
    } else {
      document.querySelector('#drinkCounter').innerHTML = 0; 
    }
  } else {
    document.querySelector('#drinkCounter').innerText = "?"; 
  }
}
  
// Fresh.html:

const requestURL = 'json/fruit.json';
const fruitSelectors = document.querySelectorAll('.fruit');
const formInputs = document.querySelectorAll('input');
const formTextarea = document.querySelector('textarea');

if(window.location.pathname === "/fresh.html") {

  const main = document.querySelector('.fresh');

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) { 
      createOptions(jsonObject);
    });

    function createOptions(fruits){
      fruitSelectors.forEach(fruitSelector => {
        fruits.forEach(element => {
          let option = document.createElement('option');
          let optionValue = `{"name":"${element.name}","nutritions":${JSON.stringify(element.nutritions)}}`;
          option.setAttribute('value', optionValue);
          option.innerText = element.name;
          fruitSelector.appendChild(option);
        });
      });
    }

    function confirmOrder() {
      if (isLocalStorageSupported){
        if(doesVariableExist('test')){
          localStorage.test = Number(localStorage.test) + 1;
        }else{
          localStorage.test = 1;
        }
        //console.log(localStorage.test);
      }
      //localStorage.clear()
      if (typeof Storage !== "undefined") {
        //Local storage is supported
        if (localStorage.drinkCount) {
          localStorage.drinkCount = Number(localStorage.drinkCount) + 1;
          console.log(localStorage.drinkCount); 
        } else {
          localStorage.drinkCount = 1;
        }
      } else {
        // their browser doesn't support local storage so let them know or just do nothing
        alert("Sorry, your browser does not support web storage.  Drink count will not be saved");
      }
      document.location.reload();
    }

    function cancelOrder() {
      let outputArea =  document.querySelector('#outputArea');
      if (typeof(outputArea) != 'undefined' && outputArea != null) {
        main.removeChild(main.lastChild);
      } else {
        alert('Error: no order exists');
      }

      formInputs.forEach(input => {
        input.disabled = false;
      });
      fruitSelectors.forEach(fruitSelector => {
        fruitSelector.disabled = false;
      });
      formTextarea.disabled = false;
      

      }

    function displayOutput() {
      formInputs.forEach(input => {
        input.disabled = true;
      });
      fruitSelectors.forEach(fruitSelector => {
        fruitSelector.disabled = true;
      });
      formTextarea.disabled = true;
      
      let fruit1Obj = JSON.parse(document.querySelector('#fruit1').value);
      let fruit2Obj = JSON.parse(document.querySelector('#fruit2').value);
      let fruit3Obj = JSON.parse(document.querySelector('#fruit3').value);

      let totalCarbs = fruit1Obj.nutritions.carbohydrates + fruit2Obj.nutritions.carbohydrates + fruit3Obj.nutritions.carbohydrates;
      let totalProtein = fruit1Obj.nutritions.protein + fruit2Obj.nutritions.protein + fruit3Obj.nutritions.protein;
      let totalFat = fruit1Obj.nutritions.fat + fruit2Obj.nutritions.fat + fruit3Obj.nutritions.fat;
      let totalSugar = fruit1Obj.nutritions.sugar + fruit2Obj.nutritions.sugar + fruit3Obj.nutritions.sugar;
      let totalCalories = fruit1Obj.nutritions.calories + fruit2Obj.nutritions.calories + fruit3Obj.nutritions.calories;
      
      let outputArea = document.createElement('div');
      outputArea.setAttribute('id', 'outputArea');

      let outputAreaHeader = document.createElement('h3');
      outputAreaHeader.setAttribute('id', 'outputAreaHeader');
      outputAreaHeader.innerText = 'Order Summary';
      outputArea.appendChild(outputAreaHeader);

      let fname = document.createElement('p');
      fname.setAttribute('id', 'outputFname');
      fname.innerHTML = `<b>Name:</b> ${document.querySelector('#fname').value}`; 
      outputArea.appendChild(fname);
      
      let email = document.createElement('p');
      email.setAttribute('id', 'outputEmail');
      email.innerHTML = `<b>Email:</b> ${document.querySelector('#email').value}`;
      outputArea.appendChild(email);

      let phone = document.createElement('p');
      phone.setAttribute('id', 'outputPhone');
      phone.innerHTML = `<b>Phone:</b> ${document.querySelector('#phone').value}`;
      outputArea.appendChild(phone); 

      let instructions = document.createElement('p');
      instructions.setAttribute('id', 'outputInstructions');
      instructions.innerHTML = `<b>Special Instructions:</b> ${document.querySelector('#instructions').value}`;
      outputArea.appendChild(instructions); 

      let orderDate = document.createElement('p');
      orderDate.setAttribute('id', 'orderDate');
      let now = new Date();
      let fulldateUK = new Intl.DateTimeFormat("en-UK", {
	      dateStyle: "short"
      }).format(now);
      orderDate.innerHTML = `<b>Order Date:</b> ${fulldateUK}`;
      outputArea.appendChild(orderDate); 

      let fruit1 = document.createElement('p');
      fruit1.setAttribute('id', 'outputFruit1');
      fruit1.innerHTML = `<b>Fruit 1:</b> ${fruit1Obj.name}`;
      outputArea.appendChild(fruit1);

      let fruit2 = document.createElement('p');
      fruit2.setAttribute('id', 'outputFruit2');
      fruit2.innerHTML = `<b>Fruit 2:</b> ${fruit2Obj.name}`;
      outputArea.appendChild(fruit2);

      let fruit3 = document.createElement('p');
      fruit3.setAttribute('id', 'outputFruit3');
      fruit3.innerHTML = `<b>Fruit 3:</b> ${fruit3Obj.name}`;
      outputArea.appendChild(fruit3);

      let carbs = document.createElement('p');
      carbs.setAttribute('id', 'carbs');
      carbs.innerHTML = `<b>Total Carbohydrates:</b> ${totalCarbs.toFixed(1)}`;
      outputArea.appendChild(carbs);

      let protein = document.createElement('p');
      protein.setAttribute('id', 'protein');
      protein.innerHTML = `<b>Total Protein:</b> ${totalProtein.toFixed(1)}`;
      outputArea.appendChild(protein);

      let fat = document.createElement('p');
      fat.setAttribute('id', 'fat');
      fat.innerHTML = `<b>Total Fat:</b> ${totalFat.toFixed(1)}`;
      outputArea.appendChild(fat);

      let sugar = document.createElement('p');
      sugar.setAttribute('id', 'sugar');
      sugar.innerHTML = `<b>Total Sugar:</b> ${totalSugar.toFixed(1)}`;
      outputArea.appendChild(sugar);

      let calories = document.createElement('p');
      calories.setAttribute('id', 'calories');
      calories.innerHTML = `<b>Total Calories:</b> ${totalCalories.toFixed(0)}`;
      outputArea.appendChild(calories);

      let confirmButton = document.createElement('button');
      confirmButton.setAttribute('id', 'confirmButton');
      confirmButton.setAttribute('onclick', "confirmOrder()");
      confirmButton.innerText = 'Confirm'; 
      outputArea.appendChild(confirmButton);

      let cancelButton = document.createElement('button');
      cancelButton.setAttribute('id', 'cancelButton');
      cancelButton.setAttribute('onclick', "cancelOrder()");
      cancelButton.innerText = 'Cancel'; 
      outputArea.appendChild(cancelButton);

      main.appendChild(outputArea);

    }

  }
  