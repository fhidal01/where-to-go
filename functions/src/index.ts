import * as functions from 'firebase-functions';
import * as httpClient from 'request';

type Response = functions.Response;

const config = functions.config();

function enableCORS(response: Response): void {
    response.set('Access-Control-Allow-Origin', '*');
}

function handleOptionsCORS(response: Response): void {
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
}

export const coordinates = functions.https.onRequest((request, response) => {

    enableCORS(response);

    if (request.method === 'OPTIONS') {
        handleOptionsCORS(response);
    } else {
        httpClient.get(
            { url: `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.address}&key=${config.googleservice.apikey}` },
            function (error, res, body) {
                if (!error && res.statusCode === 200) {
                    response.send(body);
                }
            });
    }
});

export const places = functions.https.onRequest((request, response) => {

    enableCORS(response);

    if (request.method === 'OPTIONS') {
        handleOptionsCORS(response);
    } else {
        console.log("@@ in else");
        httpClient.get(
            {
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.query.latitude},${request.query.longitude}&radius=1500&type=restaurant&key=${config.googleservice.apikey}`
            },
            function (error, res, body) {
                if (!error && res.statusCode === 200) {
                    response.send(body);
                }
            });
    }
});

export const map = functions.https.onRequest((request, response) => {

    enableCORS(response);

    if (request.method === 'OPTIONS') {
        handleOptionsCORS(response);
    } else {
        httpClient
            .defaults({ encoding: null })
            .get(
                { url: `https://maps.googleapis.com/maps/api/staticmap?center=${request.query.address}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7C${request.query.address}&key=${config.googleservice.apikey}` },
                function (error, res, body) {
                    if (!error && res.statusCode === 200) {
                        response.contentType("png");
                        response.send(body);
                    }
                });
    }
});