const list = document.querySelector('.list');
const input = document.querySelector('#favchap');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    const x = input.value;
    input.value = '';

    const newItem = document.createElement('li');
    const newSpan = document.createElement('span');
    const newButton = document.createElement('button');

    newItem.appendChild(newSpan);
    newSpan.textContent = x;
    newItem.appendChild(newButton);
    newButton.textContent = '❌';
    list.appendChild(newItem);

    newButton.addEventListener('click', () => {
        list.removeChild(newItem);
    });
            
    input.focus();
});

// Get current year and put it in the footer
document.querySelector("#date1").textContent = new Date().getFullYear();

// Get the last modification date and put it in the footer
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);
