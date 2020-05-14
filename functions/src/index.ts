import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as https from 'https'
const fetch = require('node-fetch');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions.https.onRequest((request, response) => {
 response.json(
     {
        mensaje: "Hello from Firebase!"
        });
});

const app = express();

app.use(cors({origin: true}));
app.get('/sentinel', async(req,res)=>{
    console.log("LAYER "+req.query.LAYER)
    let url = 'http://services.sentinel-hub.com/ogc/fis/f59bd181-b7b5-4522-b663-af8903b85f02?LAYER='+req.query.LAYER+"&STYLE="+req.query.STYLE+"&CRS="+req.query.CRS+"&TIME="+req.query.TIME+"&GEOMETRY="+req.query.GEOMETRY+"&MAXCC="+req.query.MAXCC+"&RESOLUTION="+req.query.RESOLUTION;
    console.log(url)
    const response = await fetch(url);
    const datos=await response.json();
    console.log(datos);
    res.send(datos)
})

exports.api = functions.https.onRequest(app);