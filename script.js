window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const progressBar = document.querySelector('.progress-bar');
const URL =  'https://script.google.com/macros/s/AKfycbzZ0jMrxR2wL1RBox2xBMHIuX310Zu5F63BgLB7ZRlMlUkAw9aEIKmlMbhapcXGwvS-/exec?query=next 12 hours';
  
  // Show progress bar
  progressBar.style.width = '25%';
 
    fetch(URL, {
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
    .then((response) => {
      progressBar.style.width = '50%';
      return response.json();
    })
    .then((data) => {
      progressBar.style.width = '75%';
      data.forEach((item) => {

        const tile = document.createElement('div');
        tile.classList.add('tile', item.indicator);

        const { background, foreground } = currentTheme[item.indicator] || { background: 'gray', foreground: 'black' };
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
        var previousHourPrice = item.price; 
        const { priceIndicator, previousHourPrice: updatedPreviousHourPrice } = createPriceIndicator(item, data, previousHourPrice);
        tile.appendChild(priceIndicator);
        previousHourPrice = updatedPreviousHourPrice;

          // Add ribbon content for cheapest and highest-price tiles
          if (item.indicator === 'cheapest' || item.indicator === 'highest-price') {
            const ribbon = document.createElement('div');
            ribbon.classList.add('ribbon');    
            const timeIndicator = remainingTime(item.date, item.hour-1);
            ribbon.textContent = `${timeIndicator}`;
            tile.appendChild(ribbon);
          }

          const ribbon = document.createElement('div');
          ribbon.classList.add('ribbon-top');    
          ribbon.textContent = `${item.indicator}`;
          tile.appendChild(ribbon);
          
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

function createPriceIndicator(item, data, previousHourPrice) {
  const priceIndicator = document.createElement('div');
  priceIndicator.classList.add('price-indicator');

  const priceText = document.createElement('span');
  priceText.textContent = `${(item.price * 100).toFixed(2) + '¢'}`; 
  
      var currentHour = (item.hour === 1) ? 24 : item.hour - 1;    
      
    // Find the previous hour's price
      const previousHour = data.find(h => h.hour === currentHour);
      
      if (previousHour) {
        const arrowIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrowIcon.setAttribute('viewBox', '0 0 24 24');
        arrowIcon.setAttribute('width', '32');
        arrowIcon.setAttribute('height', '32');

        const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const currentPrice = item.price;

        const isUpward = currentPrice > previousHour.price;
        previousHourPrice = currentPrice;
        arrowPath.setAttribute('d', isUpward ? 'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z' : 'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z');
        arrowPath.setAttribute('fill', 'currentColor');
        arrowIcon.appendChild(arrowPath);

        priceIndicator.appendChild(arrowIcon);
        priceIndicator.classList.add(isUpward ? 'up' : 'down');
      } 
      

  priceIndicator.appendChild(priceText);
  return { priceIndicator, previousHourPrice };
}

function remainingTime(itemDate, itemHour) {
  const now = new Date();
  const givenHourDate = new Date(itemDate);
  givenHourDate.setHours(itemHour);

  const timeDiff = givenHourDate.getTime() - now.getTime();
  const remainingMinutes = Math.floor(timeDiff / (1000 * 60));
  const remainingHours = Math.floor(remainingMinutes / 60);
  const roundedMinutes = Math.round(remainingMinutes % 60 / 30) * 30;

  if (roundedMinutes >= 60) {
    const extraHours = Math.floor(roundedMinutes / 60);
    const adjustedMinutes = roundedMinutes % 60;
    const hoursText = `${remainingHours + extraHours} hour${remainingHours + extraHours > 1 ? 's' : ''}`;
    const minutesText = adjustedMinutes > 0 ? ` ${adjustedMinutes} minute${adjustedMinutes > 1 ? 's' : ''}` : '';
    return `${hoursText}${minutesText} from now`;
  } else {
    const hoursText = remainingHours > 0 ? `${remainingHours} hour${remainingHours > 1 ? 's' : ''} ` : '';
    const minutesText = roundedMinutes > 0 ? `${roundedMinutes} minute${roundedMinutes > 1 ? 's' : ''} ` : '';
    return `${hoursText}${minutesText}from now`;
  }
}
