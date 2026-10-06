(function () {
  var selectedCity = "Youngstown, OH";
  var selectedPlan = "$2000 / Full desk";
  var cityList = document.getElementById("city-list");
  var searchInput = document.getElementById("city-search");
  var selectedValue = document.getElementById("selected-city");
  var selectedBadge = document.getElementById("selected-badge");
  var formCity = document.getElementById("form-city");
  var formPlan = document.getElementById("form-plan");
  var useTyped = document.getElementById("use-typed-city");
  var form = document.getElementById("inquire-form");
  var planCards = document.getElementById("plan-cards");

  function setCity(city, isSample) {
    selectedCity = city;
    if (selectedValue) selectedValue.textContent = city;
    if (selectedBadge) {
      selectedBadge.style.display = isSample ? "" : "none";
      selectedBadge.textContent = isSample ? "sample edition live" : "";
    }
    if (formCity) formCity.value = city;
    if (cityList) {
      cityList.querySelectorAll(".city-btn").forEach(function (btn) {
        var match = btn.getAttribute("data-city") === city;
        btn.classList.toggle("is-active", match);
      });
    }
  }

  function setPlan(plan) {
    selectedPlan = plan;
    if (formPlan) formPlan.value = plan;
    if (planCards) {
      planCards.querySelectorAll(".plan-card").forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-plan") === plan);
      });
    }
  }

  if (cityList) {
    cityList.addEventListener("click", function (e) {
      var btn = e.target.closest(".city-btn");
      if (!btn) return;
      var city = btn.getAttribute("data-city");
      var isSample = !!btn.querySelector(".badge");
      setCity(city, isSample);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = (searchInput.value || "").trim().toLowerCase();
      if (!cityList) return;
      cityList.querySelectorAll(".city-btn").forEach(function (btn) {
        var hay = btn.getAttribute("data-search") || "";
        var show = !q || hay.indexOf(q) !== -1;
        btn.parentElement.classList.toggle("is-hidden", !show);
        btn.classList.toggle("is-hidden", !show);
      });
    });
  }

  if (useTyped) {
    useTyped.addEventListener("click", function () {
      var typed = (searchInput && searchInput.value || "").trim();
      if (!typed) return;
      setCity(typed, false);
    });
  }

  if (planCards) {
    planCards.addEventListener("click", function (e) {
      var btn = e.target.closest(".plan-card");
      if (!btn) return;
      setPlan(btn.getAttribute("data-plan"));
    });
  }

  if (formPlan) {
    formPlan.addEventListener("change", function () {
      setPlan(formPlan.value);
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get("name") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var phone = (fd.get("phone") || "").toString().trim();
      var city = (fd.get("city") || selectedCity).toString().trim();
      var plan = (fd.get("plan") || selectedPlan).toString().trim();
      var note = (fd.get("note") || "").toString().trim();
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + (phone || "(none)") + "\n" +
        "City: " + city + "\n" +
        "Preferred plan: " + plan + "\n" +
        "Note: " + (note || "(none)") + "\n";
      var mailto =
        "mailto:paul@soaraistudio.com" +
        "?subject=" + encodeURIComponent("Freedom Portal / News Org inquire") +
        "&body=" + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }
})();
