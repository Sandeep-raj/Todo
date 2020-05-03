const axios = require('axios');
const config = require('./config/config');

exports.authenticate = function(req,res,next){

    if(req.url[req.url.length - 1] === '/')
        req.url = req.url.substring(0,req.url.length-1);

    if(req.url === '/auth/auth/signin'){
        var username = req.body.username;
        var password = req.body.password;

        if(username === undefined || password === undefined){
            res.status(400).send('The username or passsword is invalid');
        }else{
            axios.post(`http://${config.authService}:4000/auth/signin`,{
                username : username,
                password : password
            }).then(function(response){
                res.json(response.data);
            },function(err){
                console.log(err);
                res.send('Error');
            });
        }
    }else if(req.method === 'PUT' || req.method === 'POST'){
        console.log(req.headers);
        if(req.headers.authorization !== undefined){
            axios.get(`http://${config.authService}:4000/auth/`,{ headers : { authorization : req.headers.authorization } })
                .then( (response) => {
                    console.log(response.status);
                    if(response.status === 200){
                        req.user = response.data;
                        next();
                    }else{
                        res.status(response.status).send(response.statusText);
                    }
                }, (err) => {
                    res.status(err.response.status).send(err.response.statusText);
                });
        }else{
            res.status(401).send('Authentication Error - No Token Found');
        }
    }else{
        next();
    }
}