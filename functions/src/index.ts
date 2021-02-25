const functions =  require('firebase-functions');
const express = require('express');
const cors = require('cors');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
import validateToken from './validateToken'


const app = express();

app.use(cors({origin: true}));
app.use(express.json());


app.get('/', async (req : any, res : any) => {
    try {
        res.send('Hello')
    } catch (err) {
        res.send(err)
    }
})



app.post('/accessToken', validateToken(), async (req: any, res: any) => {
    try {
        let accessToken = new AccessToken(
            functions.config().account.sid,
            req.body.sid,
            functions.config().api.secret
        );
        if (req.body.room && req.body.user) {
            accessToken.identity = req.body.user;
            let grant = new VideoGrant();
            grant.room = req.body.room;
            accessToken.addGrant(grant);
            var jwt = accessToken.toJwt();
            res.status(200).json(jwt)
        } else {
            res.status(400).json({message: 'Name is missing'})
        }
    } catch (err) {

    }
})


exports.widgets = functions.https.onRequest(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
