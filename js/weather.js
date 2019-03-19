const getWheater = (args) => {

  console.log('buscando dados da internet')
  var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
  var method = 'GET';
  var app_id = 'Ta904E6k';
  var consumer_key = 'dj0yJmk9Z3ZRNDNCdm9DUlNFJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTgx';
  var consumer_secret = '18c9985078665aed3bf6409174eda58c131cbe8f';
  var concat = '&';
  var query = {
    format: 'json',
    u: 'c',
    lat: args.lat,
    lon: args.lon
  };

  var oauth = {
    'oauth_consumer_key': consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
  };

  var merged = {};
  $.extend(merged, query, oauth);
  // Note the sorting here is required
  var merged_arr = Object.keys(merged).sort().map(function (k) {
    return [k + '=' + encodeURIComponent(merged[k])];
  });
  var signature_base_str = method +
    concat + encodeURIComponent(url) +
    concat + encodeURIComponent(merged_arr.join(concat));

  var composite_key = encodeURIComponent(consumer_secret) + concat;
  var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
  var signature = hash.toString(CryptoJS.enc.Base64);

  oauth['oauth_signature'] = signature;
  var auth_header = 'OAuth ' + Object.keys(oauth).map(function (k) {
    return [k + '="' + oauth[k] + '"'];
  }).join(',');

  $.ajax({
    url: url + '?' + $.param(query),
    headers: {
      'Authorization': auth_header,
      'X-Yahoo-App-Id': app_id
    },
    method: 'GET',
    success: function (data) {
      let _ls = JSON.parse(localStorage.getItem('wheater-data')) || {}
      _ls[data.location.woeid] = data
      localStorage.setItem('wheater-data', JSON.stringify(_ls))
      localStorage.setItem('last-woeid', data.location.woeid)
      localStorage.setItem('last-check', new Date().getTime())
      refreshUi(_ls[data.location.woeid])
    }
  })
}
