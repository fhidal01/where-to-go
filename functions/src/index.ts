import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as httpClient from 'request';
import * as httpClientPromise from 'request-promise-native';
import * as cors from 'cors';

//(When working locally) - Comment In
import { local } from './localconfig';

admin.initializeApp();
const express = require('express');
const app = express();

type Config = {
  googleservice: {
    apikey: string;
  };
  cors: {
    allowedorigins: string;
  };
};

//(When working locally) - Comment Out
//const config = functions.config() as Config;

//(When working locally) - Comment In
const config = local;

const whitelist = config.cors.allowedorigins.split(',');
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback('Not Today Satan', false);
    }
  }
};

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if (
    (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
};

app.use(cors(corsOptions));
app.use(validateFirebaseIdToken);

async function getPlaces(request) {
  return httpClientPromise({
    uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.query.latitude},${
      request.query.longitude
    }&radius=1500&type=restaurant&key=${config.googleservice.apikey}`,
    json: true
  });
}

async function getPlacesDetails(placeId: string) {
  return httpClientPromise({
    uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${
      config.googleservice.apikey
    }`,
    json: true
  });
}

async function getPhoto(reffId: string) {
  return httpClientPromise({
    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reffId}&key=${
      config.googleservice.apikey
    }`,
    resolveWithFullResponse: true
  });
}

app.get('/coordinates', (request, response) => {
  httpClient.get(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?${request.query.type}=${request.query.address}&key=${
        config.googleservice.apikey
      }`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.send(body);
      }
    }
  );
});

app.get('/places', (request, response) => {
  httpClient.get(
    {
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.query.latitude},${
        request.query.longitude
      }&radius=1500&type=restaurant&key=${config.googleservice.apikey}`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.send(body);
      }
    }
  );
});

app.get('/placeDetails', (request, response) => {
  httpClient.get(
    {
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${request.query.place}&key=${
        config.googleservice.apikey
      }`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.send(body);
      }
    }
  );
});

app.get('/places-enhanced', async (request, response) => {
  const details = [];
  const places = await getPlaces(request);

  for (const place of places.results) {
    details.push(await getPlacesDetails(place.place_id));
  }

  response.send(details.map(obj => obj.result));
});

app.get('/location/autocomplete', (request, response) => {
  httpClient.get(
    {
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${request.query.input}&key=${
        config.googleservice.apikey
      }&sessiontoken=${request.user.user_id}`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.send(body);
      }
    }
  );
});

app.get('/map', (request, response) => {
  httpClient.defaults({ encoding: null }).get(
    {
      url: `https://maps.googleapis.com/maps/api/staticmap?center=${
        request.query.address
      }&zoom=13&size=800x500&maptype=roadmap&markers=color:red%7C${request.query.address}&key=${
        config.googleservice.apikey
      }`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.contentType('png');
        response.send(body);
      }
    }
  );
});

app.get('/photo', (request, response) => {
  httpClient.defaults({ encoding: null }).get(
    {
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${request.query.maxwidth}&photoreference=${
        request.query.reff
      }&key=${config.googleservice.apikey}`
    },
    function(error, res, body) {
      if (!error && res.statusCode === 200) {
        response.contentType('png');
        response.send(body);
      }
    }
  );
});

app.get('/photo-url', async (request, response) => {
  let ids = new Array<string>();
  const urls = new Array<string>();

  if (request.query.ids) {
    ids = request.query.ids.split(',');
  }

  for (const id of ids) {
    const result = await getPhoto(id);
    urls.push(result.request.uri.href);
  }

  response.send(urls);
});

exports.api = functions.https.onRequest(app);
