try {
    var http = require("http");
    var url = require('url');
    var fs = require('fs');
    //Checks the  required modules are available or not.
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((url === undefined)) throw new Error( " Can't access url module" );
    if ((fs === undefined)) throw new Error( " Can't access fs module" );

    //Function which get called everytime when server receives therequest from client.
    var server = http.createServer ( function(req,res) {
        //Checks and allows only the GET requests from the requests coming from client.
        if (req.method === 'GET'){
            var parts = req.url.split('/');
            if( parts[1] !== "favicon.ico") {
                //Checks the existence of the images of given name from the client request in Image folder.
                fs.exists ( "Images/" + parts[1], function (exists) {
                    console.log("test: ", exists);
                    if ( exists ) {
                        //Read synchronously the images from Image folder.
                        var img = fs.readFileSync( "Images/" + parts[1] );
                        res.writeHead(200, {'Content-Type': 'image/gif' });
                        res.end(img, 'binary');
                    } else {
                        //shows error message when image not found.
                        res.writeHead(400, {"Content-Type": "text/html"});
                        res.write("<h1>File not found " + parts[1] + "</h1>");
                        res.end();
                    }
                });
            }
        }
    });
    server.listen(1337, "127.0.0.1", function(){
        console.log( "Listening on- 127.0.0.1:1337" );
    });
    
} catch ( errorMessage) {
    console.log( "Error: ", errorMessage);
}