if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function () { console.log('Service Worker Registered'); });
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

const lastLocation = localStorage.getItem('wheater-data-current') || null
const lastCheck = parseInt(localStorage.getItem('wheater-data-last-check')) || null

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
    console.log("I'm sorry, but geolocation services are not supported by your browser.")
    getWheater()
    refreshUi(JSON.parse(localStorage.getItem('wheater-data'))[lastLocation])
  }
}
refreshUi(JSON.parse(localStorage.getItem('wheater-data'))[lastLocation])
