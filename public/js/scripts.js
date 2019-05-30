async function getWeather(searchValue) {
  const data = await fetch(
    `/weather?address=${searchValue}`
  );
  return await data.json();
}

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  message1.textContent = `Please wait..`;
  message2.textContent = ``;
  message1.className = '';
  getWeather(input.value).then(data => {
    if (!data || data.error) {
      message1.textContent = `${data.error}`;
      message1.className = 'error';
    } else {
      message1.textContent = `${data.location}:`;
      message2.textContent = `${data.forecastReport}`;
      message1.className = 'success';
    }
  });
});
