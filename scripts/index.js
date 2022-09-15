// Get current year and put it in the footer
document.querySelector("#date1").textContent = new Date().getFullYear();

// Get the last modification date and put it in the footer
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);
