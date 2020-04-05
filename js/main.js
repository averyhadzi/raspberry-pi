// var errorCallback = function(e) {
//     console.log('Reeeejected!', e);
//   };

//   // Chrome only prefix
//   navigator.webkitGetUserMedia({video: true, audio: false}, function(localMediaStream) {
//     var video = document.querySelector('video');
//     video.src = window.URL.createObjectURL(localMediaStream);

//     // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
//     // See crbug.com/110938.
//     video.onloadedmetadata = function(e) {
//     var idx = 0;
//     var filters = [
//       'grayscale',
//       'sepia',
//       'blur',
//       'brightness',
//       'contrast',
//       'hue-rotate', 'hue-rotate2', 'hue-rotate3',
//       'saturate',
//       'invert',
//       ''
//     ];

//     function changeFilter(e) {
//       console.log('changed filter');
//       var el = e.target;
//       el.className = '';
//       var effect = filters[idx++ % filters.length]; // loop through filters.
//       if (effect) {
//         el.classList.add(effect);
//       }
//     }

//     document.querySelector('video').addEventListener(
//         'click', changeFilter, false);
//     };
//   }, errorCallback);


// var core = new MotionDetector.Core();

// $(document).ready(function(){
  var day = moment().format('dddd');
  var date = moment().format('MMMM Do, YYYY');
  var time = moment().format('h:mm:ss a');
  $('.day').text(day);
  $('.date').text(date);
    setInterval(function() {
        time = '';
        time = moment().format('h:mm a');
      $('.time').text(time);
  }, 1000);

    var cityId = '5425043'; // Highlands Ranch
    // var cityId = '5856195' // Honolulu, HI
    // var cityId = '993800'; // Joburg
    // var cityId = '5389489'; // Sacramento

    const username = 'averywolkin@gmail.com';
    const password = 'fbRb7EKN4nsmxQKtX@Fh';
    const creds = { username, password };

    fetch('https://api.meural.com/v0/authenticate', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

      $.getJSON( 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=e69ae6c95baa97cda40d37f0159c0f67&units=imperial', function( data ) {
        var items = [];
        console.log(data)
        var weatherTemp = data.main.temp,
            weatherTempF = Math.round(weatherTemp),
            weatherID = data.weather[0].id,
            weatherIconId = data.weather[0].icon,
            weatherIcon = 'http://openweathermap.org/img/w/' + weatherIconId + '.png',
            weatherMain = data.weather[0].main,
            weatherDescription = data.weather[0].description;


        // Sunset / Sunrise 

        var zone = 'America/Denver';
        var sunriseTime = moment.unix(data.sys.sunrise).tz(zone);
        var sunsetTime = moment.unix(data.sys.sunset).tz(zone);
        var utcTime = moment.utc();

        console.log('current ' + moment().format('h:mm a') + ' sunsetUnix ' + moment(sunsetTime).format('h:mm a'))


        if(weatherDescription.match(/cloud/gi)) {
          $('#clouds').removeClass('inactive');
          if($('#default').hasClass('faded')) {
            $('#umbrella, #default').toggleClass('faded');
          }
        } 
        if (weatherDescription.match(/rain/gi)) {
          $('.rain').removeClass('inactive');
          $('#umbrella, #default').toggleClass('faded');
          createRain(weatherDescription);
        }
        if (weatherDescription.match(/sun/gi)) {
          $('.sunny').removeClass('inactive');
          $('#sunburn, #default').toggleClass('faded');
        }
        if (weatherDescription.match(/snow/gi)) {
          $('.snow').removeClass('inactive');
          $('#umbrella, #default').toggleClass('faded');
          createSnow(weatherDescription);
        }

        if(utcTime > sunsetTime) {
          $('#night, #default, #umbrella, #sunburn').toggleClass('faded');
        }

        var weatherID = weatherID;
        $('.weatherIcon').addClass(weatherID);
        $('.weatherIcon img').attr('src', weatherIcon);
        $('.weatherTemp').html(weatherTempF + '<span>&deg;</span>');
        // $('.weatherMain').text(weatherMain);
        $('.weatherMain').text(weatherDescription);

      });

  // number of drops created.
  var nbDrop; 

  // function to generate a random number range.
  function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

  // function to generate drops
  function createRain(weatherDescription) {
    if(weatherDescription.match(/light/gi)) {
      $('.rain').addClass('light');
      nbDrop = 100;
    } else {
      $('.rain').removeClass('light');
      nbDrop = 2000;
    }

    for( i=1;i<nbDrop;i++) {
      var dropLeft = randRange(0,1600);
      var dropTop = randRange(-1000,1400);

      $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
      $('#drop'+i).css('left',dropLeft);
      $('#drop'+i).css('top',dropTop);
    }

  }



  // function to generate snow
  function createSnow(weatherDescription) {
    if(weatherDescription.match(/light/gi)) {
      $('.snow').addClass('light');
      nbDrop = 100;
    } else {
      $('.snow').removeClass('light');
      nbDrop = 2000;
    }

    for( i=1;i<nbDrop;i++) {
    var dropLeft = randRange(0,2000);
    var dropTop = randRange(-1000,1400);

    $('.snow').append('<div class="snowflake" id="snowflake'+i+'"></div>');
    $('#snowflake'+i).css('left',dropLeft);
    $('#snowflake'+i).css('top',dropTop);
    
    $('#snowflake'+i).animate({
        opacity: Math.random()
      });
    }

  }
  


// });

// var time = new Date().getTime();
// function refresh() {
//    if(new Date().getTime() - time >= 3600000) 
//        window.location.reload(true);
//    else 
//        setTimeout(refresh, 3600000);
// }

// setTimeout(refresh, 3600000);
