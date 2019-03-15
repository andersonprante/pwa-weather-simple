const getImgName = (code) => {

  switch(code) {
  case 0:
    // console.log('tornado')
  case 1:
    // console.log('tropical storm')
    return 'rainy-1'
  case 2:
    // console.log('hurricane')
  case 3:
    // console.log('severe thunderstorms')
    return 'rainy-6'
  case 4:
    // console.log('thunderstorms')
  case 5:
    // console.log('mixed rain and snow')
  case 6:
    // console.log('mixed rain and sleet')
  case 7:
    // console.log('mixed snow and sleet')
    return 'thunder'
  case 8:
    // console.log('freezing drizzle')
  case 9:
    // console.log('drizzle')
  case 10:
    // console.log('freezing rain')
    return 'rainy-7'
  case 11:
    // console.log('showers')
  case 12:
    // console.log('showers')
  case 13:
    // console.log('snow flurries')
    case 14:
    // console.log('light snow showers')
    return 'snowy-4'
  case 15:
    // console.log('blowing snow')
  case 16:
    // console.log('snow')
    return 'snowy-5'
  case 17:
    // console.log('hail')
  case 18:
    // console.log('sleet')
  case 19:
    // console.log('dust')
  case 20:
    // console.log('foggy')
  case 21:
    // console.log('haze')
  case 22:
    // console.log('smoky')
  case 23:
    // console.log('blustery')
  case 24:
    // console.log('windy')
  case 25:
    // console.log('cold')
  case 26:
    return 'cloudy'
  case 27:
    // console.log('mostly cloudy (night)')
    return 'cloudy-night-2'
  case 28:
    // console.log('mostly cloudy (day)')
    return 'cloudy-day-2'
  case 29:
    // console.log('partly cloudy (night)')
    return 'cloudy-night-3'
  case 30:
    // console.log('partly cloudy (day)')
    return 'cloudy-day-3'
  case 31:
    // console.log('clear (night)')
    return 'night'
  case 32:
    // console.log('sunny')
    return 'day'
  case 33:
    // console.log('fair (night)')
    return 'cloudy-night-1'
  case 34:
    // console.log('fair (day)')
    return 'cloudy-day-1'
  case 35:
    // console.log('mixed rain and hail')
    return 'rainy-1'
  case 36:
    // console.log('hot')
    return 'day'
  case 37:
    // console.log('isolated thunderstorms')
  case 38:
  case 39:
    // console.log('scattered thunderstorms')
    return 'thunder'
  case 40:
    // console.log('scattered showers')
  case 41:
    // console.log('heavy snow')
  case 42:
    // console.log('scattered snow showers')
  case 43:
    // console.log('heavy snow')
  case 44:
    // console.log('partly cloudy')
  case 45:
    // console.log('thundershowers')
  case 46:
    // console.log('snow showers')
  case 47:
    // console.log('isolated thundershowers')
    return 'thunder'
  case 3200:
    // console.log('not available')
  }

}
