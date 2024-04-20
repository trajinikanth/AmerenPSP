window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const progressBar = document.querySelector('.progress-bar');

  // Show progress bar
  progressBar.style.width = '25%';

  fetch(
    'https://script.google.com/macros/s/AKfycbzZ0jMrxR2wL1RBox2xBMHIuX310Zu5F63BgLB7ZRlMlUkAw9aEIKmlMbhapcXGwvS-/exec?query=next 24 hours'
  )
    .then((response) => {
      progressBar.style.width = '50%';
      return response.json();
    })
    .then((data) => {
      progressBar.style.width = '75%';
      data.forEach((item) => {
        const tile = document.createElement('div');
        tile.classList.add('tile', item.indicator);
        const { background, foreground } =
          currentTheme[item.indicator] || { background: 'gray', foreground: 'black' };
        tile.style.backgroundColor = background;
        tile.style.color = foreground;


        
        const dateElement = document.createElement('div');
        let options = { month: 'long', day: 'numeric', ordinal: true };
        dateElement.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date(item.date));
        tile.appendChild(dateElement);
        
        const hourCircleContainer = document.createElement('div');
        hourCircleContainer.classList.add('hour-circle-container');

        const hourCircle = document.createElement('div');
        hourCircle.classList.add('hour-circle');
        hourCircle.textContent = `${displayHour(item.hour - 1)}`;

        hourCircleContainer.appendChild(hourCircle);
        tile.appendChild(hourCircleContainer);

        const priceElement = document.createElement('div');
        priceElement.textContent = `Price: ${(item.price * 100).toFixed(2) + '¢'}`;

        const indicatorElement = document.createElement('div');
        indicatorElement.textContent = `${item.indicator}`;

        

        tile.appendChild(priceElement);
        tile.appendChild(indicatorElement);

        container.appendChild(tile);
      });

      progressBar.style.width = '100%';
      setTimeout(() => {
        progressBar.style.width = '0%';
      }, 500);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      progressBar.style.width = '0%';
    });

  // Set up automatic page refresh every hour (60 minutes * 60 seconds * 1000 milliseconds)
  setInterval(refreshPage, 60 * 60 * 1000);
});

function displayHour(hour) {
  if (hour === 0) {
    return '12 AM';
  } else if (hour < 12) {
    return hour + ' AM';
  } else if (hour === 12) {
    return '12 PM';
  } else {
    return (hour - 12) + ' PM';
  }
}

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = 'AM';

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = 'PM';
  }

  h = (h < 10) ? '0' + h : h;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  var time = h + ':' + m + ':' + s + ' ' + session;
  document.getElementById('MyClockDisplay').innerText = time;
  document.getElementById('MyClockDisplay').textContent = time;

  setTimeout(showTime, 1000);
}

function refreshPage() {
  window.location.reload();
}

// Call the showTime function when the page loads
window.addEventListener('DOMContentLoaded', showTime);


// Add an event listener to the window object for scroll events
window.addEventListener("scroll", function() {
  // Get the div element with the id "MyClockDisplay"
var clockDisplay = document.getElementById("MyClockDisplay");

  // Get the current scroll position
  var scrollPosition = window.scrollY;

  // Check if the user has scrolled to the top of the page
  if (scrollPosition === 0) {
    // Show the clock display
    clockDisplay.style.display = "block";
  } else {
    // Hide the clock display
    clockDisplay.style.display = "none";
  }
});