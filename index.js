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
    r.get('/status/.*', handleStatusRequest)

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

async function handleStatusRequest(request) {
    
    const countryCode = request.url.substring(request.url.lastIndexOf('/') + 1);
    const indicators_ids = "/2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,3001,3002,3003,3004,3005,3006,3007,3008,3009,3010,4001,4002,4003,4004,4005,4006,4007,4008,4009,4010";
  
    var response;
    if (countryCode == "help"){
          response = await fetch(`https://reopen.europa.eu/api/covid/v1/eutcdata/data/en/FRA/${indicators_ids}`);
    }
    else{
          response = await fetch(`https://reopen.europa.eu/api/covid/v1/eutcdata/data/en/${countryCode}/${indicators_ids}`);
    }
    
  const body = await response.json();
    
  var res = {};
  var keys = ""
  
  body[0]["indicators"].forEach(function(indicator){
      
        res[indicator["indicator_name"]] = {"value": indicator["value"], "comment" : indicator["comment"] }
        keys += indicator["indicator_name"] + "<br>";
})
    if (countryCode == "help"){
  return new Response("<html>"+ keys+'</html>', {status: 200,     headers: { "Content-Type": "text/html" },})
    }
    else {
          return new Response(JSON.stringify(res), {status: 200})

    }
}
