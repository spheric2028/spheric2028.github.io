/* SPHERIC 2028 — navigation and venue map */

(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];

  function setNavOpen(open) {
    if (!nav || !toggle) {
      return;
    }
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  function initMap() {
    var mapEl = document.getElementById("venue-map");
    if (!mapEl || typeof L === "undefined") {
      return;
    }

    /* Monash University Clayton campus */
    var lat = -37.9108;
    var lng = 145.1348;
    var map = L.map(mapEl, {
      scrollWheelZoom: false
    }).setView([lat, lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("Monash University, Clayton campus")
      .openPopup();

    /* Recalculate size if the section was laid out while hidden */
    setTimeout(function () {
      map.invalidateSize();
    }, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    initMap();
  }
})();
