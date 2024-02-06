/// <reference types="../@types/jquery" />

const itemsContainer = document.getElementById("itemsContainer");
const mealModal = new bootstrap.Modal('#mealModal')
const detailsContainer = document.getElementById("detailsContainer");
const activityContainer = document.getElementById("activityContainer");
const BackContainer = document.getElementById("BackContainer");

$(async function () {

    await getMealByName("").then(() => {
        $(".loading .loading-icon").delay(1500).fadeOut(1000, function () {
            $(".loading").slideUp(500, function () {
                $("body").removeClass("overflow-hidden")
                $(".loading").remove()
            });
        });
    })

});

// -------------------- Navbar  ----------------------
function openNav() {
    $("body").animate({ marginLeft: "150px" }, 500);
    $(".nav-contain").animate({ width: "150px" }, 500);
    $("i.toggleIcon").addClass("fa-times");
    $(".navItem a").addClass("focus-in");
    setTimeout(function () {
        $(".navItem a").removeClass("focus-in");
    }, 800);

}
function closeNav() {
    $("body").animate({ marginLeft: "0" }, 500);
    $(".nav-contain").animate({ width: "0" }, 500);
    $("i.toggleIcon").removeClass("fa-times");
    $(".navItem a").addClass("blur-out");
    setTimeout(function () {
        $(".navItem a").removeClass("blur-out");
    }, 500);
}

$("#navToggle").on("click", function () {
    let navContainWidth = $(".nav-contain").outerWidth();
    if (navContainWidth == 0) {
        openNav()
    }
    else {
        closeNav()
    }
})

/// -------------------- loading screen on / off ----------------------

function loadingScreenOn() {
    $("body").addClass("overflow-hidden")
    $(".inner-loading").slideDown(0, function () {
        $(".inner-loading .loading-icon").fadeIn(200);
    });
}

function loadingScreenOff() {
    $(".inner-loading .loading-icon").fadeOut(1000, function () {
        $(".inner-loading").slideUp(1000, function () {
            $("body").removeClass("overflow-hidden")
        });
    });
}


/// -------------------- Get and display meals funcs ----------------------


// -------- display meals
function displayMeals(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3">
          <div onclick="getMealDetails('${data[i].idMeal}')" class="meal-img pointer position-relative rounded-3 overflow-hidden">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
            <div
              class="meal-layer d-flex justify-content-center align-items-center text-center bg-white bg-opacity-75">
              <h2>${data[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
    }

    itemsContainer.innerHTML = box;
}
/// -------------------- Category's Get and Display-----------
// -------- display category
function displayCategories(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3">
          <div onclick="getMealByCategory('${data[i].strCategory}')" class="meal-img pointer position-relative rounded-3 overflow-hidden">
            <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
            <div
              class="meal-layer d-flex flex-column justify-content-center align-items-center text-center px-2 bg-white bg-opacity-75">
              <h2>${data[i].strCategory}</h2>
              <p>${data[i].strCategoryDescription.split(" ").slice(0,22).join(" ") + "...."}</p>
            </div>
          </div>
        </div>
        `
    }

    itemsContainer.innerHTML = box;
}

// -------- Get categories
async function getCategories() {
    closeNav();
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    responseData.categories ? displayCategories(responseData.categories) : displayCategories([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

// -------- Get meal's by category
async function getMealByCategory(category) {
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    backToCategories()
    responseData.meals ? displayMeals(responseData.meals) : displayMeals([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}
/// -------------------- Area's Get and Display-----------
// -------- display Areas
function displayAreas(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3">
        <div onclick="getMealByArea('${data[i].strArea}')"
            class="meal-img areas-div pointer position-relative text-center text-white p-3 ">
            <i class="w-100 text-center fa-solid fa-house-chimney-window " style="font-size:80px"></i>
            <h2 class="text-center">${data[i].strArea}</h2>
        </div>
    </div>
        `
    }

    itemsContainer.innerHTML = box;
}

// -------- Get Areas
async function getAreas() {
    closeNav();
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    responseData.meals ? displayAreas(responseData.meals) : displayAreas([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

// -------- Get meal's by Area
async function getMealByArea(Area) {
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    backToAreas()
    responseData.meals ? displayMeals(responseData.meals) : displayMeals([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

/// -------------------- ingredient's Get and Display-----------
// -------- display ingredient
function displayIngredients(data) {
    let box = "";

    for (let i = 0; i < 25; i++) {
        box += `
        <div class="col-md-6 col-lg-3">
        <div onclick="getMealByIngredient('${data[i].strIngredient}')"
            class="meal-img areas-div pointer position-relative text-center text-white p-3 ">
            <i class="w-100 text-center fa-solid fa-utensils " style="font-size:80px"></i>
            <h2 class="text-center">${data[i].strIngredient}</h2>
            <p>${data[i].strDescription.split(" ").slice(0,20).join(" ") + "...."}</p>
        </div>
    </div>
        `
    }

    itemsContainer.innerHTML = box;
}

// -------- Get Ingredients
async function getIngredients() {
    closeNav();
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    responseData.meals ? displayIngredients(responseData.meals) : displayIngredients([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

// -------- Get meal's by Ingredient
async function getMealByIngredient(Ingredient) {
    loadingScreenOn()
    clearUp()
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    backToIngredients()
    responseData.meals ? displayMeals(responseData.meals) : displayMeals([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

/// -------------------- Back Buttons funcs-----------
function backToCategories() {

    BackContainer.innerHTML = `
    <div class="d-grid pt-3 gap-2">
    <button type="button" onclick="getCategories()" id="" class="btn btn-outline-warning">
      Back
    </button>
  </div>`;
}

function backToAreas() {

    BackContainer.innerHTML = `
    <div class="d-grid pt-3 gap-2">
    <button type="button" onclick="getAreas()" id="" class="btn btn-outline-warning">
      Back
    </button>
  </div>`;
}

function backToIngredients() {

    BackContainer.innerHTML = `
    <div class="d-grid pt-3 gap-2">
    <button type="button" onclick="getIngredients()" id="" class="btn btn-outline-warning">
      Back
    </button>
  </div>`;
}

/// -------------------- meal's details Get and Display-----------

// -------- Get meal's details
async function getMealDetails(id) {

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    responseData = await responseData.json()

    displayMealDetails(responseData.meals[0])

}

// -------- Display meal's details
function displayMealDetails(meal) {

    detailsContainer.innerHTML = '';

    let ingredients = '';


    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] === "" || meal[`strIngredient${i}`] === null)
            ingredients += '';
        else
            ingredients += `<li class="rounded-3 bg-info-subtle text-black px-2 py-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }

    let tagsArray;
    let tags = '';

    if (meal.strTags == null || meal.strTags == "") {
        tagsArray = []
    }
    else {
        tagsArray = meal.strTags.split(",")
        for (let i = 0; i < tagsArray.length; i++) {

            tags += `<li class="rounded-3 bg-danger-subtle text-black px-2 py-1">${tagsArray[i]}</li>`
        }
    }

    let box = `
    <div class="col-lg-4">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-3"
                      alt="">
                    <h2 class="fs-1">${meal.strMeal}</h2>
                  </div>

                  <div class="col-lg-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>

                    <h3><strong>Area : </strong><span class="fw-normal">${meal.strArea}</span></h3>
                    <h3><strong>Category : </strong><span class="fw-normal">${meal.strCategory}</span></h3>
                    <h3><strong>Recipes : </strong></h3>

                    <ul class="d-flex flex-wrap gap-2">
                    ${ingredients}
                    </ul>

                    <h3><strong>Tags : </strong></h3>

                    <ul class="d-flex flex-wrap gap-2">
                    ${tags}
                    </ul>

                    <div class="mt-4">
                      <a href="${meal.strSource}" target="_blank" class="btn btn-outline-success">Source</a>
                      <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>
                  </div>
    `;



    detailsContainer.innerHTML += box;

    mealModal.show()
}

/// -------------------- Search Get and Display-----------
// -------- Get meal's by name
async function getMealByName(search) {
    loadingScreenOn()
    BackContainer.innerHTML = "";
    itemsContainer.innerHTML = "";

    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    responseData.meals ? displayMeals(responseData.meals) : displayMeals([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

// -------- Get meal's by first letter
async function getMealByLetter(search) {
    loadingScreenOn()
    BackContainer.innerHTML = "";
    itemsContainer.innerHTML = "";

    search == "" ? search = "." : "";
    let responseData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    responseData = await responseData.json();

    //to fix reading property of null we must put a value for the func
    responseData.meals ? displayMeals(responseData.meals) : displayMeals([])
    setTimeout(() => {
        loadingScreenOff()
    }, 1000);
}

// -------- Display Search Page
function getSearchPage() {
    closeNav();
    clearUp()
    itemsContainer.innerHTML = "";
    activityContainer.innerHTML = `
    <div class="row pt-3">
    <div class="col">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Search By Name</span>
        <input onkeyup="getMealByName(this.value)" type="text" class="form-control bg-dark text-white" id="inputByName">
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Search By First Letter</span>
        <input onkeyup="getMealByLetter(this.value)" type="text" class="form-control bg-dark text-white" id="inputByLetter" maxlength="1">
      </div>
    </div>
  </div>`;
}

/// -------------------- Display Contact Page and validation-----------
function getContactUs() {
    closeNav()
    clearUp()
    itemsContainer.innerHTML = "";

    let box = `
    <div class="flex-center w-100 vh-100">
        <div class="bg-white text-center rounded-3 py-3 px-5">
        <h2 class=" mb-5 text-warning">Contact Us</h2>
        <div class="row g-4">
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="nameValidation(this.value)" type="text" class="form-control" id="nameInput" placeholder="Name">
                    <label for="nameInput">Your Name</label>
                </div>
                <div id="nameInvalid" class="d-none">
                    <span class="text-danger">
                        Special characters and numbers not allowed, Minimum 3 letters , Maximum 30 letters
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="emailValidation(this.value)" type="email" class="form-control" id="emailInput" placeholder="E-mail">
                    <label for="emailInput">Your E-mail</label>
                </div>
                <div id="emailInvalid" class="d-none">
                    <span class="text-danger">
                        Email not valid *exemple@yyy.zzz
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="phoneValidation(this.value)" type="text" class="form-control" id="phoneInput" placeholder="Phone Number">
                    <label for="phoneInput">Your Phone</label>
                </div>
                <div id="phoneInvalid" class="d-none">
                    <span class="text-danger">
                        Enter a valid Phone Number
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="ageValidation(this.value)" type="number" class="form-control" id="ageInput" placeholder="Age">
                    <label for="ageInput">Your Age</label>
                </div>
                <div id="ageInvalid" class="d-none">
                    <span class="text-danger">
                        Enter valid age between 6-100 years old
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="passwordValidation(this.value)" type="password" class="form-control" id="passwordInput" placeholder="Password">
                    <label for="passwordInput">Your Password</label>
                </div>
                <div id="passwordInvalid" class="d-none">
                    <span class="text-danger">
                        Enter valid password (Minimum 8 characters, at least one letter and one number)
                    </span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-1">
                    <input onkeyup="repasswordValidation(this.value)" type="password" class="form-control" id="repasswordInput" placeholder="Repassword">
                    <label for="repasswordInput">Retype Your Password</label>
                </div>
                <div id="repasswordInvalid" class="d-none">
                    <span class="text-danger">
                        Passwords are not the same.
                    </span>
                </div>
            </div>
        </div>
        <button onclick="contactBtn()" type="button" class="btn btn-outline-warning my-3" id="submit-contact" disabled>
            Submit
        </button>
    </div>
    </div>
        `
    

        itemsContainer.innerHTML = box;
}

function contactBtn() {
    contactSuccess() 
        setTimeout(() => {
            mealModal.hide()
            clearContact()
        }, 1500);
}

function contactSuccess() {

    detailsContainer.innerHTML = '';

    let box = `
                  <div class="flex-center h-100">
                  <h2><span><i class="fa-solid fa-circle-check text-success fa-beat me-3"></i></span>Success</h2>
                  </div>
    `;
    detailsContainer.innerHTML += box;

    mealModal.show()
}

function clearContact() {
    $("#nameInput").val("");
    $("#emailInput").val("");
    $("#phoneInput").val("");
    $("#ageInput").val("");
    $("#passwordInput").val("");
    $("#repasswordInput").val("");
    
    $("#nameInput").removeClass("is-valid")
	$("#nameInvalid").addClass("d-none")

    $("#emailInput").removeClass("is-valid")
	$("#emailInvalid").addClass("d-none")

    $("#phoneInput").removeClass("is-valid")
	$("#phoneInvalid").addClass("d-none")

    $("#ageInput").removeClass("is-valid")
	$("#ageInvalid").addClass("d-none")

    $("#passwordInput").removeClass("is-valid")
	$("#passwordInvalid").addClass("d-none")

    $("#repasswordInput").removeClass("is-valid")
	$("#repasswordInvalid").addClass("d-none")

    $("#submit-contact").attr("disabled","true").removeClass("btn-warning").addClass("btn-outline-warning");
}

var nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s]{3,30}$/;
var emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
var phoneRegex = /^(?:\+?20)?(01)[0125]\d{8}$/;
var ageRegex = /^(?:6|7|8|9|[1-9][0-9]|100)$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


var nameValid;
var emailValid;
var phoneValid;
var ageValid;
var passwordValid;
var repasswordValid;

// name validation
function nameValidation(input) {
        nameValid = nameRegex.test(input) && input != "";
        checkInputs()

        if (!nameValid) {
                $("#nameInput").removeClass("is-valid")
                $("#nameInput").addClass("is-invalid")
                $("#nameInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#nameInput").removeClass("is-invalid")
                $("#nameInput").addClass("is-valid")
                $("#nameInvalid").addClass("d-none")
                return true;
        }
};

// email validation
function emailValidation(input) {
        emailValid = emailRegex.test(input);
        checkInputs()
        if (!emailValid) {
                $("#emailInput").removeClass("is-valid")
                $("#emailInput").addClass("is-invalid")
                $("#emailInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#emailInput").removeClass("is-invalid")
                $("#emailInput").addClass("is-valid")
                $("#emailInvalid").addClass("d-none")
                return true;
        }
};

// phone validation
function phoneValidation(input) {
        phoneValid = phoneRegex.test(input);
        checkInputs()
        if (!phoneValid) {
                $("#phoneInput").removeClass("is-valid")
                $("#phoneInput").addClass("is-invalid")
                $("#phoneInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#phoneInput").removeClass("is-invalid")
                $("#phoneInput").addClass("is-valid")
                $("#phoneInvalid").addClass("d-none")
                return true;
        }
};

// age validation
function ageValidation(input) {
        ageValid = ageRegex.test(input);
        checkInputs()
        if (!ageValid) {
                $("#ageInput").removeClass("is-valid")
                $("#ageInput").addClass("is-invalid")
                $("#ageInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#ageInput").removeClass("is-invalid")
                $("#ageInput").addClass("is-valid")
                $("#ageInvalid").addClass("d-none")
                return true;
        }
};

// password validation
function passwordValidation(input) {
        passwordValid = passwordRegex.test(input);
        checkInputs()
        if (!passwordValid) {
                $("#passwordInput").removeClass("is-valid")
                $("#passwordInput").addClass("is-invalid")
                $("#passwordInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#passwordInput").removeClass("is-invalid")
                $("#passwordInput").addClass("is-valid")
                $("#passwordInvalid").addClass("d-none")
                return true;
        }
};

// repassword validation
function repasswordValidation(input) {
        repasswordValid = $("#passwordInput").val() == input && input != "";
        checkInputs()
        if (!repasswordValid) {
                $("#repasswordInput").removeClass("is-valid")
                $("#repasswordInput").addClass("is-invalid")
                $("#repasswordInvalid").removeClass("d-none")
                return false;
        }
        else {
                $("#repasswordInput").removeClass("is-invalid")
                $("#repasswordInput").addClass("is-valid")
                $("#repasswordInvalid").addClass("d-none")
                return true;
        }
};

// check all inputs validation
function checkInputs() {
    if (nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid) {
            $("#submit-contact").removeAttr("disabled").removeClass("btn-outline-warning").addClass("btn-warning");
    }
    else {
            $("#submit-contact").attr("disabled","true").removeClass("btn-warning").addClass("btn-outline-warning");
    }
};

// clear all the sections above the meals container
function clearUp() {
    BackContainer.innerHTML = "";
    activityContainer.innerHTML = "";
};



