// *** update api work
async function getId(id, selector) {
  switch (selector.id) {
    case "airportTable":
      localStorage.setItem("airportid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateAirport.html"
      );
      break;
    case "airlineTable":
      localStorage.setItem("airlineid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateAirline.html"
      );
      break;
    case "airplaneTable":
      localStorage.setItem("airplaneid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateAirplane.html"
      );
      break;
    case "flightTable":
      localStorage.setItem("flightid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateFlights.html"
      );
      break;
    case "crewTable":
      localStorage.setItem("crewid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateCrew.html"
      );
      break;
    case "boardingTable":
      localStorage.setItem("boardingid", id);
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/updateBoardingPass.html"
      );
      break;

    default:
      return;
  }
}
var _airportFetchedByIdData;
var _airlineFetchedByIdData;
var _airplaneFetchedByIdData;
var _flightFetchedByIdData;
var _crewFetchedByIdData;
var _boardingPassFetchedByIdData;

const update_airline_fk = document.getElementById("airline_fk");
const update_flight_fk = document.getElementById("flight_fk");

let airport_name = document.getElementById("update_airport_name");
let airport_country = document.getElementById("update_airport_country");
let airport_location = document.getElementById("update_airport_location");

let airline_name = document.getElementById("update_airline_name");
let airline_phone = document.getElementById("update_airline_phone");
let airline_address = document.getElementById("update_airline_address");

const airplane_modelNumber = document.getElementById("update_airplane_model");
const airplane_totalSeats = document.getElementById("update_airplane_seats");
const airplane_manufacturer = document.getElementById(
  "update_airplane_manufacturer"
);

const flight_departDate = document.getElementById("update_dept_date");
const flight_arrivalDate = document.getElementById("update_arriv_date");
const flight_departTime = document.getElementById("update_dept_time");
const flight_arrivalTime = document.getElementById("update_arriv_time");
const flight_from = document.getElementById("update_from");
const flight_to = document.getElementById("update_to");
const flight_totalSeats = document.getElementById("update_flight_seats");

const crew_firstName = document.getElementById("update_crew_fname");
const crew_lastName = document.getElementById("update_crew_lname");
const crew_phone = document.getElementById("update_crew_phone");
const crew_designation = document.getElementById("update_crew_designation");

const boarding_checkin = document.getElementById("update_checkin");

const boarding_gate = document.getElementById("update_boardingPass_gate");

const boarding_firstName = document.getElementById("update_passenger_fname");
const boarding_lastName = document.getElementById("update_passenger_lname");
const boarding_phone = document.getElementById("update_passenger_phone");
const boarding_email = document.getElementById("update_passenger_email");

const boarding_fare = document.getElementById("update_boardingPass_fare");

const boarding_weight = document.getElementById("update_boardingPass_bagggage");

async function getAirportById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/airport/${id}`,
      config
    );

    if (data.status === 200) {
      let airportData = data.data.data;
      _airportFetchedByIdData = { ...airportData };
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateAirportData(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      name: airport_name.value,
      country: airport_country.value,
      location: airport_location.value,
    };

    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/airport/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("Airport updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}

if (locations && locations.includes("updateAirport.html")) {
  const id = localStorage.getItem("airportid");

  document.getElementById("updateAirport_body").onload = async function (e) {
    e.preventDefault();
    await getAirportById(id);
    airport_name.value = _airportFetchedByIdData.name;
    airport_country.value = _airportFetchedByIdData.country;
    airport_location.value = _airportFetchedByIdData.location;
  };
  document.getElementById("update_airport-form").onsubmit = function (e) {
    e.preventDefault();
    updateAirportData(id);
  };
}
// airline
async function getAirlineById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/airline/${id}`,
      config
    );

    if (data.status === 200) {
      let airlineData = data.data.data;
      _airlineFetchedByIdData = { ...airlineData };
      delete _airlineFetchedByIdData.flights;
      delete _airlineFetchedByIdData.airplanes;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateAirlineData(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      name: airline_name.value,
      address: airline_address.value,
      phone: airline_phone.value,
    };
    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/airline/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("Airline updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
if (locations && locations.includes("updateAirline.html")) {
  const id = localStorage.getItem("airlineid");
  document.getElementById("updateAirline_body").onload = async function (e) {
    e.preventDefault();
    await getAirlineById(id);

    airline_name.value = _airlineFetchedByIdData.name;
    airline_phone.value = _airlineFetchedByIdData.phone;
    airline_address.value = _airlineFetchedByIdData.address;
  };
  document.getElementById("update_airline-form").onsubmit = async function (e) {
    e.preventDefault();
    await updateAirlineData(id);
  };
}
// airplane
async function getAirplaneById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/airplane/${id}`,
      config
    );

    if (data.status === 200) {
      let airplaneData = data.data.data;
      _airplaneFetchedByIdData = { ...airplaneData };
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateAirplaneData(id) {
  try {
    const airplane_airlineId =
      update_airline_fk.options[update_airline_fk.selectedIndex];

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      modelNumber: airplane_modelNumber.value,
      totalSeats: airplane_totalSeats.value,
      manufacturer: airplane_manufacturer.value,
      airlineId: airplane_airlineId.value,
    };

    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/airplane/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("Airplane updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    console.log(error);
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
if (locations && locations.includes("updateAirplane.html")) {
  const id = localStorage.getItem("airplaneid");
  document.getElementById("updateAirplane_body").onload = async function (e) {
    e.preventDefault();
    constructDropdown();
    await getAirplaneById(id);

    airplane_modelNumber.value = _airplaneFetchedByIdData.modelNumber;
    airplane_totalSeats.value = _airplaneFetchedByIdData.totalSeats;
    airplane_manufacturer.value = _airplaneFetchedByIdData.manufacturer;
  };
  document.getElementById("update_airplane-form").onsubmit = async function (
    e
  ) {
    e.preventDefault();
    await updateAirplaneData(id);
  };
}

// flight
async function getFlightById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/flight/${id}`,
      config
    );

    if (data.status === 200) {
      let flightData = data.data.data;
      _flightFetchedByIdData = { ...flightData };
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateFlightData(id) {
  try {
    const flight_airlineId =
      update_airline_fk.options[update_airline_fk.selectedIndex];

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      airlineId: flight_airlineId.value,
      departDate: flight_departDate.value,
      arrivalDate: flight_arrivalDate.value,
      departTime: flight_departTime.value,
      arrivalTime: flight_arrivalTime.value,
      from: flight_from.value,
      to: flight_to.value,
      totalSeats: flight_totalSeats.value,
    };

    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/flight/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("Flight updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    console.log(error);
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
if (locations && locations.includes("updateFlights.html")) {
  const id = localStorage.getItem("flightid");
  document.getElementById("updateFlight_body").onload = async function (e) {
    e.preventDefault();
    constructDropdown();
    await getFlightById(id);

    flight_departDate.value = _flightFetchedByIdData.departDate;
    flight_arrivalDate.value = _flightFetchedByIdData.arrivalDate;
    flight_departTime.value = _flightFetchedByIdData.departTime;
    flight_arrivalTime.value = _flightFetchedByIdData.arrivalTime;
    flight_from.value = _flightFetchedByIdData.from;
    flight_to.value = _flightFetchedByIdData.to;
    flight_totalSeats.value = _flightFetchedByIdData.totalSeats;
  };
  document.getElementById("update_flight-form").onsubmit = async function (e) {
    e.preventDefault();
    await updateFlightData(id);
  };
}

// crew
async function getCrewById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/crew/${id}`,
      config
    );

    if (data.status === 200) {
      let crewData = data.data.data;
      _crewFetchedByIdData = { ...crewData };
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateCrewData(id) {
  try {
    const crew_flightId =
      update_flight_fk.options[update_flight_fk.selectedIndex];

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      flightId: crew_flightId.value,
      firstName: crew_firstName.value,
      lastName: crew_lastName.value,
      phone: crew_phone.value,
      designation: crew_designation.value,
    };

    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/crew/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("Crew updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    console.log(error);
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
if (locations && locations.includes("updateCrew.html")) {
  const id = localStorage.getItem("crewid");
  document.getElementById("updateCrew_body").onload = async function (e) {
    e.preventDefault();
    constructFlightDropdown();
    await getCrewById(id);

    crew_firstName.value = _crewFetchedByIdData.firstName;
    crew_lastName.value = _crewFetchedByIdData.lastName;
    crew_phone.value = _crewFetchedByIdData.phone;
    crew_designation.value = _crewFetchedByIdData.designation;
  };
  document.getElementById("update_crew-form").onsubmit = async function (e) {
    e.preventDefault();
    await updateCrewData(id);
  };
}

// boardingPass
async function getBoardingPassById(id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = await axios.get(
      `https://flight-management-server.herokuapp.com/api/v1/boardingPass/${id}`,
      config
    );

    if (data.status === 200) {
      let boardingPassData = data.data.data;
      _boardingPassFetchedByIdData = { ...boardingPassData };
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
async function updateBoardingPassData(id) {
  try {
    const boardingPass_flightId =
      update_flight_fk.options[update_flight_fk.selectedIndex];

    const boarding_hasCheckin =
      boarding_checkin.options[boarding_checkin.selectedIndex];
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      hasCheckin: boarding_hasCheckin.value,
      gate: boarding_gate.value,
      flightId: boardingPass_flightId.value,
      passenger: {
        firstName: boarding_firstName.value,
        lastName: boarding_lastName.value,
        phone: boarding_phone.value,
        email: boarding_email.value,
      },
      ticket: {
        flightId: boardingPass_flightId.value,
        fare: boarding_fare.value,
      },
      baggage: {
        weight: boarding_weight.value,
      },
    };

    const data = await axios.put(
      `https://flight-management-server.herokuapp.com/api/v1/boardingpass/${id}`,
      body,
      config
    );

    if (data.status === 200) {
      alert("BoardingPass updated successfully!");
      window.location.replace(
        "https://flight-management-system-6eb92.web.app/home.html"
      );
    }
  } catch (error) {
    console.log(error);
    document.getElementById("message").innerHTML = error.response.data.message;
  }
}
if (locations && locations.includes("updateBoardingPass.html")) {
  const id = localStorage.getItem("boardingid");
  document.getElementById("updateBoardingPass_body").onload = async function (
    e
  ) {
    e.preventDefault();
    constructFlightDropdown();
    await getBoardingPassById(id);
    boarding_gate.value = _boardingPassFetchedByIdData.gate;

    boarding_firstName.value = _boardingPassFetchedByIdData.passenger.firstName;
    boarding_lastName.value = _boardingPassFetchedByIdData.passenger.lastName;
    boarding_phone.value = _boardingPassFetchedByIdData.passenger.phone;
    boarding_email.value = _boardingPassFetchedByIdData.passenger.email;
    boarding_fare.value = _boardingPassFetchedByIdData.ticket.fare;
    boarding_weight.value = _boardingPassFetchedByIdData.Baggage.weight;
  };
  document.getElementById("update_boardingPass-form").onsubmit =
    async function (e) {
      e.preventDefault();
      await updateBoardingPassData(id);
    };
}
