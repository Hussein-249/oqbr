const form = document.getElementById("contactForm");
const result = document.getElementById("success");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "<div class='alert alert-info'>Please wait...</div>";
  result.style.display = "block";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML =
          "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
          "<strong>" +
          json.message +
          "</strong></div>";
      } else {
        console.log(response);
        result.innerHTML =
          "<div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
          "<strong>Error: " +
          json.message +
          "</strong></div>";
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML =
        "<div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
        "<strong>Something went wrong! Please try again later.</strong></div>";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
