(function () {
  "use strict";

  var tinyslider = function () {
    var el = document.querySelectorAll(".testimonial-slider");

    if (el.length > 0) {
      var slider = tns({
        container: ".testimonial-slider",
        items: 1,
        axis: "horizontal",
        controlsContainer: "#testimonial-nav",
        swipeAngle: false,
        speed: 700,
        nav: true,
        controls: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false,
      });
    }
  };
  tinyslider();

  var sitePlusMinus = function () {
    var value,
      quantity = document.getElementsByClassName("quantity-container");

    function createBindings(quantityContainer) {
      var quantityAmount =
        quantityContainer.getElementsByClassName("quantity-amount")[0];
      var increase = quantityContainer.getElementsByClassName("increase")[0];
      var decrease = quantityContainer.getElementsByClassName("decrease")[0];
      increase.addEventListener("click", function (e) {
        increaseValue(e, quantityAmount);
      });
      decrease.addEventListener("click", function (e) {
        decreaseValue(e, quantityAmount);
      });
    }

    function init() {
      for (var i = 0; i < quantity.length; i++) {
        createBindings(quantity[i]);
      }
    }

    function increaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);

      console.log(quantityAmount, quantityAmount.value);

      value = isNaN(value) ? 0 : value;
      value++;
      quantityAmount.value = value;
    }

    function decreaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);

      value = isNaN(value) ? 0 : value;
      if (value > 0) value--;

      quantityAmount.value = value;
    }

    init();
  };
  sitePlusMinus();
})();

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav div ul li a");

  // Function to remove active class from all nav links
  const removeActiveClasses = () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    let top = window.scrollY + window.innerHeight / 2; // Adjusted to consider half the viewport height

    sections.forEach((sec) => {
      let offset = sec.offsetTop;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        removeActiveClasses();
        const activeLink = document.querySelector(
          `nav div ul li a[href="#${id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Function to handle click event
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      removeActiveClasses();
      event.currentTarget.classList.add("active");

      // Optional: Smooth scroll to section
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      // Prevent default anchor click behavior
      event.preventDefault();
    });
  });

  // Initial call to set active class based on initial scroll position
  handleScroll();
});
