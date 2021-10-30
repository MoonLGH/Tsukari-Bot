/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
(function() {
  "use strict"; // Start of use strict

  let mainNav = document.querySelector('#mainNav');

  if (mainNav) {

    let navbarCollapse = mainNav.querySelector('.navbar-collapse');
    
    if (navbarCollapse) {

      let collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      let navbarItems = navbarCollapse.querySelectorAll('a');
      
      // Closes responsive menu when a scroll trigger link is clicked
      for (let item of navbarItems) {
        item.addEventListener('click', function (event) {
          collapse.hide();
        });
      }
    }

    // Collapse Navbar
    let collapseNavbar = function() {

      let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);
  }

})(); // End of use strict

const t = document.getElementById("title")

setInterval(()=>{
    animate()
    if(t.innerText === "Tsukari"){
        t.innerText = "つかり"
    }else{
        t.innerText = "Tsukari"
    }
},5000)

function animate(){
    setTimeout(()=>{
        t.classList.remove("animate")        
    },1000)
    t.classList.add("animate")
}