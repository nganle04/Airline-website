async function login() {
  try {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/auth",
      { email, password },
      config
    );
    if (data.status === 200) {
      alert("Login successfull!");
      localStorage.setItem("token", data.data.token);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}

async function register() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/userRegister",
      { name, phone, email, password },
      config
    );

    if (data.status === 200) {
      alert("Register successfull!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/index.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}

const locations = window.location.href;
console.log(locations);
if (locations === 'https://flight-management-system-6eb92.web.app/' || locations.includes('index.html')) {
  let form = document.getElementById("form1");
  form.onsubmit = function (e) {
    e.preventDefault();
    login();
  };
}
if (locations && locations.includes("register.html")) {
  let registerForm = document.getElementById("registerForm");
  registerForm.onsubmit = function (e) {
    e.preventDefault();
    register();
  };
}

var _airportFetchedData;
var _airlineFetchedData;
var _airplaneFetchedData;
var _flightFetchedData;
var _passengerFetchedData;
var _crewFetchedData;
var _ticketFetchedData;
var _boardingFetchedData;

// fetch from api's
async function fetchAirportData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/airport",
      config
    );

    if (data.status === 200) {
      let airportData = data.data.data;
      _airportFetchedData = airportData;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchAirlineData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/airline",
      config
    );

    if (data.status === 200) {
      let airline = data.data.data;
      let airlineCopy = [...airline];

      // copy flights and airplanes array and remove it
      for (let key in airlineCopy) {
        let flights = [...airlineCopy[key].flights];
        let airplanes = [...airlineCopy[key].airplanes];
        delete airlineCopy[key].flights;
        delete airlineCopy[key].airplanes;

        flights.forEach((x) => {
          // add flightid
          airlineCopy[key].flightId = x.id;
        });
        airplanes.forEach((x) => {
          // add
          airlineCopy[key].airplane_Manufacturer = x.manufacturer;
          airlineCopy[key].airplane_ModelNum = x.modelNumber;

          if (x.manufacturer === "" || x.modelNumber === "") {
            airlineCopy[key].airplane_Manufacturer = null;
            airlineCopy[key].airplane_ModelNum = null;
          }
        });
      }

      return (_airlineFetchedData = airlineCopy);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchAirplaneData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/airplane",
      config
    );

    if (data.status === 200) {
      let airplane = data.data.data;
      let airplaneCopy = [...airplane];

      for (let key in airplaneCopy) {
        let airline = { ...airplaneCopy[key].airline };
        delete airplaneCopy[key].airline;
        // add
        airplaneCopy[key].airline_name = airline.name;

        if (airline === null) {
          airplaneCopy[key].airline_name = null;
        }
      }
      return (_airplaneFetchedData = airplaneCopy);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchFlightData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/flight",
      config
    );

    if (data.status === 200) {
      const flight = data.data.data;
      let flightCopy = [...flight];

      for (let key in flightCopy) {
        let airline = { ...flightCopy[key].airline };
        delete flightCopy[key].airline;
        // add
        flightCopy[key].airline_name = airline.name;

        if (airline === null) {
          flightCopy[key].airline_name = null;
        }
      }
      _flightFetchedData = flightCopy;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchPassengerData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/passenger",
      config
    );

    if (data.status === 200) {
      const passenger = data.data.data;
      let passengerCopy = [...passenger];

      for (let key in passengerCopy) {
        let Baggage = { ...passengerCopy[key].Baggage };

        delete passengerCopy[key].Baggage;
        // add
        passengerCopy[key].baggage = `${Baggage.weight} kg`;
        if (Baggage.weight === undefined) {
          passengerCopy[key].baggage = "";
        }
      }
      _passengerFetchedData = passengerCopy;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchCrewData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/crew",
      config
    );

    if (data.status === 200) {
      const crew = data.data.data;
      let crewCopy = [...crew];
      for (const key in crewCopy) {
        delete crewCopy[key].flight;
      }
      _crewFetchedData = crewCopy;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchTicketData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/ticket",
      config
    );

    if (data.status === 200) {
      const ticket = data.data.data;
      let ticketCopy = [...ticket];

      for (const key in ticketCopy) {
        let _flight = { ...ticketCopy[key].flight };
        let _passenger = { ...ticketCopy[key].passenger };
        delete ticketCopy[key].flight;
        delete ticketCopy[key].passenger;

        // add
        ticketCopy[key].flightId = _flight.id;
        ticketCopy[key].passenger_fname = _passenger.firstName;
        ticketCopy[key].passenger_lname = _passenger.lastName;

        if (
          _flight.id === undefined ||
          _passenger.firstName === undefined ||
          _passenger.lastName === undefined
        ) {
          ticketCopy[key].flightId = null;
          ticketCopy[key].passenger_fname = "";
          ticketCopy[key].passenger_lname = "";
        }
      }
      _ticketFetchedData = ticketCopy;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function fetchBoardingData() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      "https://flight-management-server.herokuapp.com/api/v1/boardingPass",
      config
    );

    if (data.status === 200) {
      const boardingPass = data.data.data;
      let boardingPassCopy = [...boardingPass];

      for (const key in boardingPassCopy) {
        let _baggage = { ...boardingPassCopy[key].Baggage };
        let _passenger = { ...boardingPassCopy[key].passenger };
        delete boardingPassCopy[key].Baggage;
        delete boardingPassCopy[key].baggageId;
        delete boardingPassCopy[key].passenger;
        delete boardingPassCopy[key].passengerId;
        delete boardingPassCopy[key].flight;
        delete boardingPassCopy[key].ticket;

        // add
        boardingPassCopy[key].baggage = `${_baggage.weight} kg`;
        boardingPassCopy[key].passenger_fname = _passenger.firstName;
        boardingPassCopy[key].passenger_lname = _passenger.lastName;

        if (
          _baggage.weight === undefined ||
          _passenger.firstName === undefined ||
          _passenger.lastName === undefined
        ) {
          boardingPassCopy[key].baggage = "";
          boardingPassCopy[key].passenger_fname = '';
          boardingPassCopy[key].passenger_lname = '';
        }
      }
      _boardingFetchedData = boardingPassCopy;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}

async function constructTable(arr, selector) {
  // getting all columns name
  let cols = _Headers(arr, selector);

  // traversing json data
  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement("tr");
    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      let val = arr[i][cols[colIndex]];
      // if there is any key, which is matching with the column name
      if (val == null) val = "";
      let td = document.createElement("td");
      td.innerText = val;
      row.appendChild(td);
    }
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "update";
    updateBtn.setAttribute("class", "btn btn-danger");
    updateBtn.setAttribute("onclick", `getId(${arr[i].id},${selector})`);
    row.appendChild(updateBtn);
    // adding each row to table
    document.getElementById(selector).appendChild(row);
  }
}

function _Headers(arr, selector) {
  let columns = [];
  let header = document.createElement("tr");

  for (let i = 0; i < arr.length; i++) {
    let row = arr[i];
    for (var k in row) {
      if ($.inArray(k, columns) == -1) {
        columns.push(k);
        // creating header
        let th = document.createElement("th");
        th.innerText = k;
        header.appendChild(th);
      }
    }
  }
  // appending header to the table
  document.getElementById(selector).appendChild(header);
  return columns;
}

let tableAirport = document.getElementById("airport");
let tableAirline = document.getElementById("airline");
let tableAirplane = document.getElementById("airplane");
let tableFlight = document.getElementById("flight");
let tablePassenger = document.getElementById("passenger");
let tableCrew = document.getElementById("crew");
let tableTicket = document.getElementById("ticket");
let tableBoarding = document.getElementById("boarding");

// addeventlistener
if (locations && locations.includes("home.html")) {
  let view_airport = document.getElementById("view_airport");
  view_airport.onclick = async function () {
    document.getElementById('airportTable').innerText = "";
    tableAirport.style.display = "block";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchAirportData();
    await constructTable(_airportFetchedData, "airportTable");
    changeEnable(view_airport);
  };

  let view_airline = document.getElementById("view_airline");
  view_airline.onclick = async function () {
    document.getElementById('airlineTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "block";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchAirlineData();
    await constructTable(_airlineFetchedData, "airlineTable");
    changeEnable(view_airline);
  };

  const view_airplane = document.getElementById("view_airplane");
  view_airplane.onclick = async function () {
    document.getElementById('airplaneTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "block";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchAirplaneData();
    await constructTable(_airplaneFetchedData, "airplaneTable");
    changeEnable(view_airplane);
  };

  const view_flight = document.getElementById("view_flight");
  view_flight.onclick = async function () {
    document.getElementById('flightTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "block";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchFlightData();
    await constructTable(_flightFetchedData, "flightTable");
    changeEnable(view_flight);
  };

  const view_passenger = document.getElementById("view_passenger");
  view_passenger.onclick = async function () {
    document.getElementById('passengerTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "block";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchPassengerData();
    await constructTable(_passengerFetchedData, "passengerTable");
    changeEnable(view_passenger);
  };

  const view_crew = document.getElementById("view_crew");
  view_crew.onclick = async function () {
    document.getElementById('crewTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "block";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "none";

    await fetchCrewData();
    await constructTable(_crewFetchedData, "crewTable");
    changeEnable(view_crew);
  };

  const view_ticket = document.getElementById("view_ticket");
  view_ticket.onclick = async function () {
    document.getElementById('ticketTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "block";
    tableBoarding.style.display = "none";

    await fetchTicketData();
    await constructTable(_ticketFetchedData, "ticketTable");
    changeEnable(view_ticket);
  };

  const view_boarding = document.getElementById("view_boarding");
  view_boarding.onclick = async function () {
    document.getElementById('boardingTable').innerText = "";
    tableAirport.style.display = "none";
    tableAirline.style.display = "none";
    tableAirplane.style.display = "none";
    tableFlight.style.display = "none";
    tablePassenger.style.display = "none";
    tableCrew.style.display = "none";
    tableTicket.style.display = "none";
    tableBoarding.style.display = "block";

    await fetchBoardingData();
    await constructTable(_boardingFetchedData, "boardingTable");
    changeEnable(view_boarding);
  };

  function changeEnable(selector) {
    view_airport.disabled = false;
    view_airline.disabled = false;
    view_airplane.disabled = false;
    view_flight.disabled = false;
    view_passenger.disabled = false;
    view_crew.disabled = false;
    view_ticket.disabled = false;
    view_boarding.disabled = false;

    switch (selector) {
      case view_airport:
        view_airport.disabled = true;
        break;
      case view_airline:
        view_airline.disabled = true;
        break;
      case view_airplane:
        view_airplane.disabled = true;
        break;
      case view_flight:
        view_flight.disabled = true;
        break;
      case view_passenger:
        view_passenger.disabled = true;
        break;
      case view_crew:
        view_crew.disabled = true;
        break;
      case view_ticket:
        view_ticket.disabled = true;
        break;
      case view_boarding:
        view_boarding.disabled = true;
        break;
      default:
        return;
    }
  }
}

// ****
async function postAirportData() {
  try {
    let name = document.getElementById("airport_name").value;
    let country = document.getElementById("airport_country").value;
    let location = document.getElementById("airport_location").value;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      name: name,
      country: country,
      location: location,
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/airport",
      body,
      config
    );

    if (data.status === 200) {
      alert("Airport created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
async function postAirlineData() {
  try {
    const name = document.getElementById("airline_name").value;
    const phone = document.getElementById("airline_phone").value;
    const address = document.getElementById("airline_address").value;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      name,
      phone,
      address,
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/airline",
      body,
      config
    );

    if (data.status === 200) {
      alert("Airline created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
const airline_fk = document.getElementById("airline_fk");
const flight_fk = document.getElementById("flight_fk");

async function postAirplaneData() {
  try {
    const modelNumber = document.getElementById("airplane_model").value;
    const totalSeats = document.getElementById("airplane_seats").value;
    const manufacturer = document.getElementById("airplane_manufacturer").value;
    const airlineId = airline_fk.options[airline_fk.selectedIndex].value;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      modelNumber,
      totalSeats,
      manufacturer,
      airlineId,
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/airplane",
      body,
      config
    );

    if (data.status === 200) {
      alert("Airplane created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
async function postFlightData() {
  try {
    const departDate = document.getElementById("dept_date").value;
    const arrivalDate = document.getElementById("arriv_date").value;
    const departTime = document.getElementById("dept_time").value;
    const arrivalTime = document.getElementById("arriv_time").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const totalSeats = document.getElementById("flight_seats").value;
    const airlineId = airline_fk.options[airline_fk.selectedIndex].value;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      airlineId,
      departDate,
      arrivalDate,
      departTime,
      arrivalTime,
      from,
      to,
      totalSeats,
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/flight",
      body,
      config
    );

    if (data.status === 200) {
      alert("Flight created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
async function postCrewData() {
  try {
    const firstName = document.getElementById("crew_fname").value;
    const lastName = document.getElementById("crew_lname").value;
    const phone = document.getElementById("crew_phone").value;
    const designation = document.getElementById("crew_designation").value;
    const flightId = flight_fk.options[flight_fk.selectedIndex].value;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      flightId,
      firstName,
      lastName,
      phone,
      designation,
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/crew",
      body,
      config
    );

    if (data.status === 200) {
      alert("Crew created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
async function postBoardingData() {
  try {
    const checkin = document.getElementById("checkin");
    const hasCheckin = checkin.options[checkin.selectedIndex].value;
    const flightId = flight_fk.options[flight_fk.selectedIndex].value;
    const gate = document.getElementById("boardingPass_gate").value;

    const firstName = document.getElementById("passenger_fname").value;
    const lastName = document.getElementById("passenger_lname").value;
    const phone = document.getElementById("passenger_phone").value;
    const email = document.getElementById("passenger_email").value;

    const fare = document.getElementById("boardingPass_fare").value;

    const weight = document.getElementById("boardingPass_bagggage").value;

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      hasCheckin,
      gate,
      flightId,
      passenger: {
        firstName,
        lastName,
        phone,
        email,
      },
      ticket: {
        flightId,
        fare,
      },
      baggage: {
        weight,
      },
    };

    const data = await axios.post(
      "https://flight-management-server.herokuapp.com/api/v1/boardingpass",
      body,
      config
    );

    if (data.status === 200) {
      alert("Boarding Pass created successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}

if (locations && locations.includes("createAirport.html")) {
  document.getElementById("airport-form").onsubmit = function (e) {
    e.preventDefault();
    postAirportData();
  };
}
if (locations && locations.includes("createAirline.html")) {
  document.getElementById("airline-form").onsubmit = function (e) {
    e.preventDefault();
    postAirlineData();
  };
}
if (locations && locations.includes("createAirplane.html")) {
  constructDropdown();
  document.getElementById("airplane-form").onsubmit = function (e) {
    e.preventDefault();
    postAirplaneData();
  };
}
if (locations && locations.includes("createFlight.html")) {
  constructDropdown();
  document.getElementById("flight-form").onsubmit = function (e) {
    e.preventDefault();
    postFlightData();
  };
}
if (locations && locations.includes("createCrew.html")) {
  constructFlightDropdown();
  document.getElementById("crew-form").onsubmit = function (e) {
    e.preventDefault();
    postCrewData();
  };
}
if (locations && locations.includes("createBoardingPass.html")) {
  constructFlightDropdown();
  document.getElementById("boardingPass-form").onsubmit = function (e) {
    e.preventDefault();    
    postBoardingData();
  };
}

async function constructDropdown() {
  // const airline_fk = document.getElementById("airline_fk");
  await fetchAirlineData();
  _airlineFetchedData.map(({ id, name }) => {
    let option = document.createElement("option");
    option.setAttribute("value", id);
    option.innerText = name;
    airline_fk.appendChild(option);
  });
}

async function constructFlightDropdown() {
  await fetchFlightData();
  _flightFetchedData.map(({ id }) => {
    let option = document.createElement("option");
    option.setAttribute("value", id);
    option.innerText = id;
    flight_fk.appendChild(option);
  });
}
