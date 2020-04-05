const EventEmitter = require('events')
const axios = require('axios')
const fs = require('fs-extra')
const path = require('path')

class Weather extends EventEmitter {
  constructor () {
    super()

    this.state = 'disconnected'

		this.cityId = '5425043'; // HR

		this.weatherDescription = null;

		this.weatherData = axios({
			method: 'get',
			url: `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=e69ae6c95baa97cda40d37f0159c0f67&units=imperial`,
			responseType: 'json'
		})
			.then(function (response) {
				console.log(response);
				this.weatherDescription = response.data.weather[0].description;
			});

    // this.stream = null

    // this.downloadFolder = '/tmp/tweet2meural/downloads'
    // fs.mkdirpSync(this.downloadFolder)
  }

  async connect () {
    return new Promise((resolve) => {
      this.stream = this.weatherData;

      this.stream.on('ping', () => { this.emit('ping') })
      this.stream.on('data', (tweet) => { this.emit('tweet', tweet) })
      this.stream.on('error', (error) => { this.emit('error', error) })
      this.stream.on('start', () => { this.state = 'connected' })
      this.stream.on('end', () => { this.emit('end') })

      this.stream.once('start', () => { return resolve() })
    })
  }


}

module.exports = Weather
