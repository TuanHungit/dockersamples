const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host:'redis-server',
    port:6379
});
client.set('visit', 0);

app.get('/', (req,res)=>{
    client.get('visit',(err,data)=>{
        res.send(`Number of visits is ${data}`);
        client.set('visit',parseInt(data)+1);
    })
})

const port = process.env.PORT || 8081;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})