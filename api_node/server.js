import {PublishCommand } from "@aws-sdk/client-sns";
import {snsClient } from "./snsClient.js";
import express from 'express';

const app = express()
const port = 80

app.use(express.json())

let params = {
  TopicArn: process.env.AWS_TOPIC_ARN,
};

app.all(/api/, async (req, res) => {
  console.log(`request ${req.url} | method ${req.method} | body ${req.body ? JSON.stringify(req.body) : null}`)
  switch (req.method) {
    case 'POST':
      if (req.url.includes('user')) { // new user
        let message = {
          ...params,
          Message: `New user created: ${JSON.stringify(req.body)}`
        };
        await snsClient.send(new PublishCommand(message));
      }
      if (req.url.includes('group')) { // new group

      }
      if (req.url.includes('dashboard')){ // new dashboard

      } 
    case 'DELETE':
      if (req.url.includes('group')) { // delete group

      }
    case 'PUT':
      if (req.url.includes('card')) { // update a card
        
      }
  }
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Mirror listening on ${port}`)
})