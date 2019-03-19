if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function () { console.log('Service Worker Registered'); });
}

const _default = {"default":{"location":{"woeid":430126,"city":"Demo","region":" BR","country":"Brazil","lat":-28.205879,"long":-53.484081,"timezone_id":"America/Sao_Paulo"},"current_observation":{"wind":{"chill":18,"direction":0,"speed":5},"atmosphere":{"humidity":95,"visibility":8.7,"pressure":959,"rising":0},"astronomy":{"sunrise":"6:36 am","sunset":"6:48 pm"},"condition":{"text":"Mostly Clear","code":33,"temperature":18},"pubDate":1552960800},"forecasts":[{"day":"Mon","date":1552878000,"low":18,"high":23,"text":"Thunderstorms","code":4},{"day":"Tue","date":1552964400,"low":17,"high":26,"text":"Partly Cloudy","code":30},{"day":"Wed","date":1553050800,"low":16,"high":21,"text":"Cloudy","code":26},{"day":"Thu","date":1553137200,"low":12,"high":20,"text":"Partly Cloudy","code":30},{"day":"Fri","date":1553223600,"low":12,"high":23,"text":"Partly Cloudy","code":30},{"day":"Sat","date":1553310000,"low":16,"high":23,"text":"Scattered Thunderstorms","code":47},{"day":"Sun","date":1553396400,"low":15,"high":25,"text":"Scattered Thunderstorms","code":47},{"day":"Mon","date":1553482800,"low":15,"high":26,"text":"Sunny","code":32},{"day":"Tue","date":1553569200,"low":16,"high":27,"text":"Mostly Sunny","code":34},{"day":"Wed","date":1553655600,"low":18,"high":25,"text":"Scattered Thunderstorms","code":47}]}}
if(localStorage.getItem('wheater-data') === null) {
  localStorage.setItem('wheater-data', JSON.stringify(_default))
}

const _cityName = document.querySelector('._city_name')
const _date = document.querySelector('._date')
const _dia_semana_hoje = document.querySelector('._dia_semana_hoje')
const _astronomia_hoje = document.querySelector('._astronomia_hoje')
const _umidade_hoje = document.querySelector('._umidade_hoje')
const _min_max_hoje = document.querySelector('._min_max_hoje')
const _descricao_hoje = document.querySelector('._descricao_hoje')
const _img_hoje = document.querySelector('._img_hoje')
const _template = document.querySelector('._template')
const _main = document.querySelector('._main')
const _card_dia = document.querySelectorAll('._card_dia')
const _outros = document.querySelector('._outros')

const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const diaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const refreshUi = (data) => {
  _cityName.innerHTML = `${data.location.city}, ${data.location.region}`
  let d = new Date(data.current_observation.pubDate * 1000)
  let dia_semana = diaSemana[d.getDay()]
  debugger
  str_d = d.toISOString().split('T')[0].split('-')
  _date.innerHTML = `${str_d[2]} de ${mes[parseInt(str_d[1]) - 1]} ${str_d[0]}`
  _dia_semana_hoje.innerHTML = dia_semana

  _astronomia_hoje.innerHTML = `${data.current_observation.astronomy.sunrise} - ${data.current_observation.astronomy.sunset}`
  _umidade_hoje.innerHTML = `${data.current_observation.atmosphere.humidity} %`
  _min_max_hoje.innerHTML = `${data.forecasts[0].low}º | ${data.forecasts[0].high}º`
  _descricao_hoje.innerHTML = `${data.forecasts[0].text}`

  // console.log(getImgName(data.forecasts[0].code))
  _img_hoje.src = `amcharts_weather_icons_1.0.0/animated/${getImgName(data.forecasts[0].code)}.svg`

  //limpa os cards existentes para na sequência adicioná-los
  _outros.innerHTML = ""

  // gerar os 9 dias restantes
  data.forecasts.slice(1).map((item, idx) => {
    let card = _template.cloneNode(true)
    card.classList.remove('_template')
    let d = new Date(item.date * 1000).toISOString().split('T')[0].split('-')
    card.querySelector('.semana').innerHTML = `(${d[2]}/${1}) ${diaSemana[weekDay.indexOf(item.day)]}`
    card.querySelector('._img').src = `amcharts_weather_icons_1.0.0/animated/${getImgName(item.code)}.svg`
    card.querySelector('.card-body>.container').innerHTML = item.text

    card.querySelector('.temperatura').innerHTML = `${item.low}º | ${item.high}º`
    card.querySelector('div.card-header').id = `heading_${idx}`
    card.querySelector('button').setAttribute('data-target', `#collapse_${idx}`)
    card.querySelector('button').setAttribute('aria-controls', `#collapse_${idx}`)
    card.querySelector('#collapse_').id = `collapse_${idx}`
    _outros.appendChild(card)
  })
}

let lastLocation = localStorage.getItem('last-woeid') || "default"
let lastCheck = parseInt(localStorage.getItem('last-check')) || null

if (!lastLocation || lastCheck < new Date().getTime() - (1000*60*30)) { // 30 minutos atrás
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      getWheater({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      refreshUi(JSON.parse(localStorage.getItem('wheater-data'))[lastLocation])
    })
  } else {
    alert('Sistema só funciona com a localização ativada')
  }
} else {
  refreshUi(JSON.parse(localStorage.getItem('wheater-data'))[lastLocation])
}
