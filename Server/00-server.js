var http = require("http");
var path = require("path");	//modulo para manipular rutas
var fs   = require("fs");	//modulo para manipular archivos (leer,grabar,etc)

function iniciar( ){

	function conexion(request, response){

		var archivo="";
		if (request.url == "/")
			archivo = "/index.html"
		else
			archivo = request.url;

		var extension   = path.extname(archivo);
		var carpeta     = "Public";
		var contentType = "text/html";

		switch(extension){
			case ".html":
				break;
			case ".css": 
				contentType = "text/css";
				carpeta     += "/css";
				break;
			case ".js":
				contentType = "text/javascript";
				carpeta     += "/js";
				break;
		}

		var direccion = path.join(".", carpeta, archivo);

		console.log(`01-Se recibio una petición para 
		url         => ${request.url}
		archivo     => ${archivo}
		extension   => ${extension}
		carpeta     => ${carpeta}
		direccion   => ${direccion}
		contentType => ${contentType}
						`);		
		responder(response, direccion, contentType);
	}

	function responder(response, direccion, contentType){

		console.log(`02-Se recibio la direccion => ${direccion}
=================================================`);

		fs.exists(direccion, function (existe){ //Preguntamos si la direccion existe junto a un callback

			if (existe){
				fs.readFile(direccion, function(error, content){
					if (error){
						response.writeHead(500);
						response.end()
					} else {						
						response.writeHead(200, {"Content-type":contentType});				
						response.end(content);							
					}	
				});
			} else {
				response.writeHead(404);
				response.end();
			}

		});

	}

	http.createServer(conexion).listen(8787);
	console.log("00-Se inicio el servidor");

}

iniciar();