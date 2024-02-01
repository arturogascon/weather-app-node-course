const searchbox = document.getElementById('searchbox');
const searchButton = document.getElementById('search-forecast-btn');
const form = document.getElementById('search-form');

const error = document.getElementById('error');
const locationResult = document.getElementById('location');
const forecast = document.getElementById('forecast');

const clearAll = () => {
    searchbox.value = '';
    error.innerText = '';
    locationResult.innerText = '';
    forecast.innerText = '';
}

searchbox.onkeyup = (e) => {
  if (e.currentTarget.value) {
    searchButton.disabled = false;
  } else {
    searchButton.disabled = true;
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  const query = searchbox.value;
  fetch(`/weather?address=${query}`).then((res) => {
    clearAll();
    res.json().then((data) => {
      if (data.error) {
        return (error.innerText = data.error);
      }

      locationResult.innerText = 'Location: ' + data.location;
      forecast.innerText = data.forecast;
    });
  });
};
