var HGWeather = (function(document) {
    var self = {}; globals = {};
  
    self.VERSION = '1.0.0';
  
    // DEFAULTS
    self.options = {
      accessibleData: ['temp', 'description', 'date', 'time', 'city', 'humidity', 'wind_speedy', 'sunrise', 'sunset'],
      assetsEndpoint: '//assets.api.hgbrasil.com/weather',
      defaultClass: 'hg-weather',
      developmentKey: 'development',
      endpoint: '//api.hgbrasil.com/weather',
      locationButtonSelector: '.get-location',
      selector: '.hg-weather'
    };
  
    self.messages = {
      developmentKeyWarning: '<div><strong>Atenção!</strong> Você está usando a chave de API de testes, a mesma só funciona no domínio localhost ou diretamente pelo arquivo.<br><a href="http://hgbrasil.com/status/weather/#chaves-de-api" target="_blank">Clique aqui</a> e solicite uma chave para seu site gratuitamente. Altere a chave na <code>data-key</code> da div com a classe <code>hg-weather</code>.</div>',
      getDataError: 'Erro ao tentar obter dados da HG Weather.',
      getLocationError: 'Erro ao tentar obter a localização através do seu navegador.'
    };
  
    // PRIVATE
    function getData(element, key, location) {
      var request = new XMLHttpRequest(),
          endpoint = self.options.endpoint + '/?format=json-cors&key=' + key +
                     '&user_ip=remote&sdk_version=js' + self.VERSION +
                     (!location ? '' : '&lat=' + location.coords.latitude + '&lon=' + location.coords.longitude);
  
      function successCallback(response) {
        var weatherElements = element.querySelectorAll('[data-weather]'),
            imageWeatherElement = element.querySelector('[data-weather="image"]'),
            weatherIndex = 0;
  
        element.className = self.options.defaultClass + ' ' + response.condition_slug;
  
        imageWeatherElement.style.display = 'inline-block';
        imageWeatherElement.src = self.options.assetsEndpoint + '/images/' + response.img_id + '.png';
  
        element.querySelector('[data-weather="message"]').style.display = 'none';
  
        for (; weatherIndex < weatherElements.length; ++weatherIndex) {
          var weatherData = weatherElements[weatherIndex];
  
          if (self.options.accessibleData.indexOf(weatherData.dataset.weather) !== -1) {
            weatherData.innerText = response[weatherData.dataset.weather];
          }
        }
      }
  
      function errorCallback() {
        var messageElement = element.querySelector('[data-weather="message"]');
  
        messageElement.style.display = 'block';
        messageElement.innerText = self.messages.getDataError;
      }
  
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var response = JSON.parse(request.responseText);
          successCallback(response.results);
        } else {
          errorCallback(request.responseText);
        }
      };
  
      request.onerror = errorCallback;
  
      request.open('GET', endpoint);
      request.send();
    }
  
    // API
    self.initialize = function(key) {
      var elements = document.querySelectorAll(self.options.selector),
          index = 0;
  
      for (; index < elements.length; ++index) {
        var current = elements[index]
            currentLocationButton = current.querySelector(self.options.locationButtonSelector);
  
        globals.key = key || current.dataset.key || self.options.developmentKey;
  
        if (globals.key == self.options.developmentKey) {
          document.body.insertAdjacentHTML('afterbegin', self.messages.developmentKeyWarning);
        }
  
        currentLocationButton.addEventListener('click', function(event) {
          event.preventDefault();
          self.getLocation(current);
        });
  
        getData(current, globals.key, false);
      }
    };
  
    self.getLocation = function(element) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
          getData(element, globals.key, location);
        });
      } else {
        alert(self.messages.getLocationError);
      }
    };
  
    return self;
  }(document));
  
  HGWeather.initialize();