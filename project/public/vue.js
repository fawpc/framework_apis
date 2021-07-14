let Vue = require('vue');
const test = Vue.createTeste({})
test.component('div-time',{
    props:['tempo'],
    data:{},
    template: '<div>\
        <h1>\HG Weather</h1>\
    <div class="hg-weather" data-key="development" data-woeid="455827">\
      <span data-weather="message">\Obtendo...<br></span>\
      <span data-weather="city">\Obtendo cidade</span> <span data-weather="temp">00</span>\º C<br>\
      <span data-weather="description">\Obtendo tempo...</span>\<br>\
      Nascer do Sol: <span data-weather="sunrise">\00:00</span>\ - Pôr do Sol: <span data-weather="sunset">\00:00</span>\<br>\
      Velocidade do vento: <span data-weather="wind_speedy">\-- km/h</span>\<br>\
      <img src="http://assets.api.hgbrasil.com/weather/images/44.png" data-weather="image">\<br>\
    </div>\
    <script>\(document.addEventListener( "DOMContentLoaded", function() { HGWeather.initialize();});</script>\
    '
    
  })
  app.mount('time') 