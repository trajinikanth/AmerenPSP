window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
  
    fetch('https://script.google.com/macros/s/AKfycbzZ0jMrxR2wL1RBox2xBMHIuX310Zu5F63BgLB7ZRlMlUkAw9aEIKmlMbhapcXGwvS-/exec?query=next 24 hours')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
            const tile = document.createElement('div');
            tile.classList.add('tile', item.indicator);
            //tile.style.backgroundColor = currentTheme[item.indicator] || 'gray';
   
            const { background, foreground } = currentTheme[item.indicator] || { background: 'gray', foreground: 'black' };
            tile.style.backgroundColor = background;
            tile.style.color = foreground;

            const dateElement = document.createElement('div');          
            let options = { month: 'long', day: 'numeric', ordinal: true };
            dateElement.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date(item.date));
  
            const hourElement = document.createElement('div');          
            hourElement.textContent =  `${displayHour(item.hour-1)}`;
            
            const priceElement = document.createElement('div');
            priceElement.textContent = `Price: ${(item.price*100).toFixed(2) + '¢'}`;
  
            const indicatorElement = document.createElement('div');
            indicatorElement.textContent = `${item.indicator}`;
      
            tile.appendChild(dateElement);
            tile.appendChild(hourElement);
            tile.appendChild(priceElement);
            tile.appendChild(indicatorElement);
            container.appendChild(tile);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

 function displayHour(hour) {
    if (hour === 0) {
        return "12 AM";
    } else if (hour < 12) {
        return hour + " AM";
    } else if (hour === 12) {
        return "12 PM";
    } else {
        return (hour - 12) + " PM";
    }
}