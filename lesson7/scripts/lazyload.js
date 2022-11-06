// Get current year and put it in the footer
document.querySelector("#date1").textContent = new Date().getFullYear();

// Get the last modification date and put it in the footer
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);


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
  