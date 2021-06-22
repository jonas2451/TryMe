const http = require ('http');
const url = require ('url')
const https = require ('https')
const fs = require ('fs');

var img_table = new Map()

//simple server for handling different requests
const app = http.createServer(async (req, res) => {
                const parsedURL = url.parse(req.url, true);

                //check for POST /api/img_api/img
                if(parsedURL.pathname === '/api/img_api/img' && req.method === 'POST') {
                    if (!parsedURL.query.img) {
                        res.statusCode = 400;
                        res.end("Image is required, please add image in the query");
                    } else {
                        handleCreate(parsedURL.query.img, res);
                    }
                }

                //MOCKPOST
                    if(parsedURL.pathname === '/api/img_api/test' && req.method === 'POST') {
                        handleCreate('test', res);
                    }

                //check for GET /api/img_api/img/all
                else if(parsedURL.pathname === '/api/img_api/img/all' && req.method === 'GET') {
                    handleShow(res);
                }

                //check for PUT /api/img_api/img/{img_id}
                else if(parsedURL.pathname === '/api/img_api/img' && req.method === 'PUT') {
                    var  imgID = extractImgID(parsedURL.pathname)

                    if(!imgID.length) {
                        res.statusCode = 400;
                        res.end("Invalid image ID");
                    } else {
                        handleUpdate(imgID, res);
                    }
                }

                //check for DELETE /api/img_api/img/{img_id}
                else if(parsedURL.pathname.startsWith('/api/img_api/img') && req.method === 'DELETE') {
                    var imgID = extractImgID(parsedURL.pathname)

                    if(!imgID.length) {
                        res.statusCode = 400;
                        res.end("Invalid image id");
                    } else {
                        handleDelete(imgID, res);
                    }
                }

                //check for GET /api/img_api/img/{img_id}
                else if(parsedURL.pathname.startsWith('/api/img_api/img') && req.method === "GET") {
                    var imgID = extractImgID(parsedURL.pathname)

                    if(!imgID.length) {
                        res.statusCode = 400;
                        res.end("Invalid image id");
                    } else {
                        handleRead(imgID, res);
                    }
                }

                //if no match send error
                else {
                    res.statusCode = 400;
                    res.end("API Endpoint not supported. Implementation by Markus");
                }
});

app.listen(4000);

//function to handle POST method
function handleCreate(img, res) {
    //update database (for testing in memory db as map)
    //updateTable(response);
    img_table.set("test", "Works as expected");
    //set header and status code and return details
    res.setHeader('content-type', 'Application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(img_table.get("test")));
}

//TODO does not throw error, but does not display all images
//function to handle GET method for retrieving all entries
function handleShow(res) {

    fs.readdir('./api/img_api/img', function (err, data) {
        if (err) throw err
        res.writeHead(200, {'content-type' : 'image/jpeg'})
        res.end(data.toString())
    })
}

//function to handle GET request for specific img
function handleRead(img, res) {

    fs.readFile(`./api/img_api/img/${img}`, function(err, data) {
        if (err) throw err // Fail if the file can't be read.
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(data) // Send the file data to the browser.
    })
}

//function to handle DELETE request
function handleDelete(img, res) {
    //check if img is available in db
    if(img_table.has(img)) {
        //delete img from db
        img_table.delete(img);
        res.statusCode = 200;
        res.end("Delete: Image with id " + img + " deleted");
    } else {
        //Send error if image is not found
        res.statusCode = 404;
        res.end("Delete: Image with id " + img + " not found");
    }
}

//function to handle PUT request
function handleUpdate(img, res) {
    //check if img is available in db
    if(img_table.has(img)) {
        //TODO implement update functionality here
        res.setHeader('content-type', 'Application/json');
        res.statusCode = 200;
        //updateTable(response)
        res.end(JSON.stringify(img_table.get(img)));
    } else {
        //Send error if image is not found
        res.statusCode = 404;
        res.end("Update: Image with id " + img + " not found");
    }
}

function extractImgID(path) {
    var imgID = path.substring(path.lastIndexOf("/") +1, path.length);

    return imgID;
}