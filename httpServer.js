try {
    var http = require("http");
    var url = require('url');
    var fs = require('fs');
    var qs = require('querystring');
    //Checks the  required modules are available or not.
    if (fs === undefined) {
        throw new Error(" Can't access fs module.");
    }
    if (http === undefined) {
        throw new Error(" Can't access http module.");
    }
    if (url === undefined) {
        throw new Error(" Can't access url module.");
    }

    //Function which get called everytime when server receives therequest from client.
    var server = http.createServer ( function createserverHandler(req, res) {
        if (req.method !== 'GET') {
            res.end("Server closed: Request is other than GET request.");
            throw new Error(" Server closed: Request is other than GET request.");
        }  //Proccessvthe GET request further.
        if( req.url.split('/')[1] === "favicon.ico") {
            res.end(); //Avoid un necessory execution of code.
        } else {
            //Findout imagename from the query string parameter.
            var imageName = qs.parse( req.url.split('?')[1] ).image;//.toLowerCase();//Converte folder name to lower case.
            fs.exists( "Images/" + imageName, function isImageFound(exists) {
                if ( !exists ) {  //shows error message when image not found.
                    res.writeHead(400, {"Content-Type": "text/html"});
                    res.end("<h1>Image not found: " + imageName + "</h1>");
                    throw new Error(" Image not found with the name given by client.");
                }
                //Read synchronously the images from Image folder.
                var img = fs.readFileSync( "./Images/" + imageName );
                res.writeHead(200, {'Content-Type': 'image/gif'});
                res.end(img, 'binary');
            });
        }
    });
    server.listen(1337, "127.0.0.1", function listenerResponse() {
        console.log( "Listening on- 127.0.0.1:1337" );
    });
} catch (err) {
    console.log(err);
}