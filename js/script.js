const Events = (() => {
  const navbar = document.querySelector(".navbar");

  // add class to navbar
  window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollTop || window.pageYOffset;

    height > 76
      ? navbar.classList.add("navbar-change")
      : navbar.classList.remove("navbar-change");
  });
  // hide preloader
  window.addEventListener("load", () =>
    document.querySelector(".preloader").classList.add("hidePreloader")
  );
})();

// create cars
const CreateCars = (() => {
  // car data
  const cars = [];
  // car class
  //hold info on every car
  class Car {
    constructor(make, category, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.category = category;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }
  // car creation function
  //when this function runs, a new object will be pushed into the cars array
  //makecar function accepts car class properties as parameters
  function makeCar(
    make,
    category,
    img = "img/car-default.jpeg",
    special = true,
    model = "new model",
    price = 100000,
    type = "manual",
    trans = "automatic",
    gas = "50"
  ) {
    //new instance of class created
    //object created for car class, will have all the properties of car class
    //instantiate a class is just assigning the class properities to a object
    const car = new Car(
      make,
      category,
      img,
      special,
      model,
      price,
      type,
      trans,
      gas
    );
    //push car object into cars array
    cars.push(car);
  }
  // produce cars
  function produceCars() {
    makeCar("veyron", "modern", "img/car-modern-0.jpg");
    makeCar("noire", "modern", "img/car-modern-5.jpg", false);
    makeCar(
      "royale",
      "classic",
      "img/car-classic-1.jpg",
      true,
      undefined,
      undefined,
      undefined,
      "manual"
    );
    makeCar("veyron", "modern", "img/car-modern-4.jpg", false);
    makeCar(
      "ventoux",
      "classic",
      "img/car-classic-2.jpg",
      undefined,
      undefined,
      undefined,
      undefined,
      "manual"
    );
    makeCar("chiron", "modern", "img/car-modern-2.jpg", false);
    makeCar(
      "vitesse",
      "classic",
      "img/car-classic-3.jpg",
      false,
      undefined,
      undefined,
      undefined,
      "manual"
    );
    makeCar("veyron", "modern", "img/car-modern-3.jpg", false);
    makeCar(
      "atalante",
      "classic",
      "img/car-classic-4.jpg",
      undefined,
      undefined,
      undefined,
      undefined,
      "manual"
    );
    makeCar(
      "royale",
      "classic",
      "img/car-classic-5.jpg",
      false,
      undefined,
      undefined,
      undefined,
      "manual"
    );
    makeCar("noire", "modern", "img/car-modern-1.jpg");
  }

  produceCars();
  // console.log(cars);
  // special cars

  const specialCars = cars.filter(car => car.special === true);
  // consol e.log(specialCars);

  return {
    cars,
    specialCars
  };
})();

// display special cars
//create car added as parameter to be used my displaysepecialcars
const DisplaySpecialCars = (CreateCars => {
  const specialCars = CreateCars.specialCars;
  // console.log(specialCars);

  const info = document.querySelector(".featured-info");

  // document loaded event
  document.addEventListener("DOMContentLoaded", () => {
    info.innerHTML = "";

    let data = "";

    specialCars.forEach(item => {
      data += `<!-- single item -->
          <div class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap">
            <span data-img="${item.img}" class="featured-icon mr-2">
              <i class="fas fa-car"></i>
            </span>
            <h5 class="font-weight-bold mx-1">${item.make}</h5>
            <h5 class="mx-1">${item.model}</h5>
          </div>
          <!-- end of single item -->`;
    });
    info.innerHTML = data;
  });
  // change img
  info.addEventListener("click", event => {
    if (event.target.parentElement.classList.contains("featured-icon")) {
      const img = event.target.parentElement.dataset.img;
      document.querySelector(".featured-photo").src = img;
    }
  });
})(CreateCars); //createcars added as an argument so that it can be used my another function

// display all cars
const DisplayCars = (CreateCars => {
  // all cars
  const cars = CreateCars.cars;
  // console.log(cars);

  // car container
  const inventory = document.querySelector(".inventory-container");

  // content loaded
  document.addEventListener("DOMContentLoaded", () => {
    inventory.innerHTML = "";

    let output = "";
    cars.forEach(car => {
      output += ` <!-- single car -->
        <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${car.category}">
          <div class="card car-card">
            <img src="${car.img}" class="card-img-top car-img" alt="">
            <!-- card body -->
            <div class="card-body">
              <div class="car-info d-flex justify-content-between">
                <!-- first flex child -->
                <div class="car-text text-uppercase">
                  <h6 class="font-weight-bold">${car.make}</h6>
                  <h6>${car.model}</h6>
                </div>
                <!-- second flex child -->
                <h5 class="car-value align-self-center py-2 px-3">$
                  <span class="car-price">${car.price}</span>
                </h5>
              </div>
            </div>
            <!-- end of card -->
            <div class="card-footer text-capitalize d-flex justify-content-between">
              <p><span><i class="fas fa-car"></i></span>${car.type}</p>
              <p><span><i class="fas fa-cogs"></i></span>${car.trans}</p>
              <p><span><i class="fas fa-gas-pump"></i></span>${car.gas}</p>
            </div>
          </div>
        </div>
        <!--end of single car -->`;
    });
    inventory.innerHTML = output;
  });
})(CreateCars);
// fitler cars
const FilterCars = (() => {
  const filter = document.querySelectorAll(".filter-btn");

  filter.forEach(btn => {
    btn.addEventListener("click", event => {
      const value = event.target.dataset.filter;
      const singleCar = document.querySelectorAll(".single-car");

      singleCar.forEach(car => {
        if (value === "all") {
          car.style.display = "block";
        } else {
          !car.classList.contains(value)
            ? (car.style.display = "none")
            : (car.style.display = "block");
        }
      });
    });
  });
})();
// show modal
const Gallery = (() => {
  // all items
  const items = document.querySelectorAll(".gallery-item");
  // modal
  const showcase = document.querySelector(".showcase");

  items.forEach(item => {
    item.addEventListener("click", event => {
      showcase.classList.add("showcase-show");
      if (event.target.classList.contains("gallery-item")) {
        let src = event.target.childNodes[1].src;
        document.querySelector(".showcase-img").src = src;
      }
    });
  });
  // close modal
  document.querySelector(".showcase-close").addEventListener("click", () => {
    showcase.classList.remove("showcase-show");
  });
})();