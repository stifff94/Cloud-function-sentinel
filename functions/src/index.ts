import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as qs from 'qs';
import { json } from 'body-parser';

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

app.post('/sentinel', async(req,res)=>{
    const client_id = "4b00288b-7f2a-4606-8412-52daba16f34a"
    const client_secret = "ySYj-+GPsmtPFjnhn3ic@,H&3RxK-:[N+Lxe<3/:"
    const body2 = ({
        client_id,
        client_secret,
        grant_type: "client_credentials"
      })
      const response = await fetch("https://services.sentinel-hub.com/api/v1/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJraWQiOiJzaCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YWZlM2IzNy04NGE1LTQ5MzctOGE3Ni04YjYxYWM2ZDVmMTkiLCJhdWQiOiI0YjAwMjg4Yi03ZjJhLTQ2MDYtODQxMi01MmRhYmExNmYzNGEiLCJqdGkiOiI1ZDUxYjAzYmIxM2U2NGViNzU3YzY0MjhlOWYzNTQyOSIsImV4cCI6MTU4OTc1MjU1OCwibmFtZSI6IklzYWFjIENhbHZhY2hpIiwiZW1haWwiOiJlc3RlYmFuLmljY0Bob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJJc2FhYyIsImZhbWlseV9uYW1lIjoiQ2FsdmFjaGkiLCJzaWQiOiI5OTNhNmRmZi03OGQwLTQ3MzctODAxOC02MjYyY2FlNGEwZDciLCJkaWQiOjEsImQiOnsiMSI6eyJyYSI6eyJyYWciOjF9LCJ0IjoxMTAwMH19fQ.HW31KKjWKLK23PWWOaQN_16UfjNKJxireFdJ8qg9zniDl2ZAfsPxXl8diYB215sKLH5BejxGuvz22fOQ5sOliTR4Qqd5nJx-StOk4kAYuLLmOfwWnDg6-LokchBkAf_JWZzaNRLcaqZrmcyj9BBav9FFIT_B-EZeb9teuxPW-HZm63dBWGh2wBiaxzyG6vv2_vBO6gAvWaxSn03aPmphLBcFzaOsc559DGGF87s3QXEEre33pTLC3p9_bQWQ5MP0kp-qqoVu2cK0MvalGXlkiIlWUlfLoFIhKiJwLXWKzlvq95NcYYcmVH8naplc9_jMMrkTMiYDx5yJEGDN3USqeQ"
        },
        body: JSON.stringify({
        "input": {
          "bounds": {
            "bbox": [
              13.822174072265625,
              45.85080395917834,
              14.55963134765625,
              46.29191774991382
            ]
          },
          "data": [{
            "type": "S2L2A"
          }]
        },
        "evalscript": `
          //VERSION=3
      
          function setup() {
            return {
              input: ["B02", "B03", "B04"],
              output: {
                bands: 3
              }
            };
          }
      
          function evaluatePixel(
            sample,
            scenes,
            inputMetadata,
            customData,
            outputMetadata
          ) {
            return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
          }
          `
        })
      }).catch((error:any)=>{console.log("el error es: "+error)})
    console.log(response.headers.get('x-ratelimit-remaining'))
    res.send(
        JSON.stringify({
        "res":response.headers.get('content-type')})
        )
    
})

exports.api = functions.https.onRequest(app);