const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const r = new Router();

    r.get('/hello', () => new Response('Hello worker!'))

    r.get('/code/.*', handleCodeRequest);
    r.get('/risk/.*', handleRiskRequest);

    const resp = await r.route(request)
    return resp
}

async function handleCodeRequest(request) {
  const countryName = request.url.substring(request.url.lastIndexOf('/') + 1);

  const response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`);
  const body = await response.json();

  if (body.status == 404) {
    return new Response(JSON.stringify({
      found: false
    }), {status: 200})  
  }

  const answer = {
    code2: body[0].alpha2Code,
    code3: body[0].alpha3Code,
    found: true
  };

  return new Response(JSON.stringify(answer), {status: 200})
}



/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRiskRequest(request) {
  const countryCode = request.url.substring(request.url.lastIndexOf('/') + 1);

  const response = await fetch(`https://www.travel-advisory.info/api?countrycode=${countryCode}`);
  const body = await response.json();

  const answer = {
    score: body.data[countryCode].advisory.score,
    maxScore: 5
  };

  return new Response(JSON.stringify(answer), {status: 200})
}
