var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET',url, true);
    http_request.send(null);

    //ojo 

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {

            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
        
        //var documentoXML=http_request.responseXML;
        var documentoxml = http_request.responseXML;
            var canciones = documentoxml.getElementsByTagName('cancion');
            var lista = document.getElementById('lista-canciones');
             for (var i = 0; i < canciones.length; i++) {
                var li = document.createElement('li');
                var texto = document.createTextNode(canciones.item(i).firstChild.nodeValue);
                li.appendChild(texto);
                lista.appendChild(li);
             };
        
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');


    }

}   
