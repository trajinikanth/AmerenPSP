const theme = {
    default: {
      'cheapest': { background: '#00ff00', foreground: 'white' },
      'highest-price': { background: '#ff0000', foreground: 'white' },
      'best-time': { background: '#999900', foreground: 'white' },
      'peak-hour': { background: '#ff8000', foreground: 'black' },
      'ok-hour': { background: '#ffff51', foreground: 'black' },
    },
    dark: {
      'cheapest': { background: '#00ff00', foreground: 'black' },
      'highest-price': { background: '#ff0000', foreground: 'white' },
      'best-time': { background: '#0000ff', foreground: 'white' },
      'peak-hour': { background: '#ffa500', foreground: 'black' },
      'ok-hour': { background: '#ffff00', foreground: 'black' },
    },
    paster:{
        'cheapest': { background: 'palegreen', foreground: 'black' },
'highest-price': { background: 'lightsalmon', foreground: 'black' },
'best-time': { background: 'powderblue', foreground: 'black' },
'peak-hour':  { background: '#ffa500', foreground: 'black' },
'ok-hour': { background: 'paleturquoise', foreground: 'black' },
    },

    monochrome:{
        'cheapest': { background: 'gray', foreground: 'black' },
'highest-price': { background: 'darkgray', foreground: 'white' },
'best-time': { background: 'silver', foreground: 'black' },
'peak-hour': { background: 'dimgray', foreground: 'white' },
'ok-hour': { background: 'lightgray', foreground: 'black' },
    }

    // You can add more theme configurations here
    //{ background: 'lemonchiffon', foreground: 'black' },
  };
  
  const currentTheme = theme.dark; // Change this to switch the theme