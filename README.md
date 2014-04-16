# Node.js (Express3 MongoDB Passport Bootstrap) Demo

This is a simple boiler-plate MVC Node.js app with authentication and user account management to be used as a starting point for new apps.

## Install and Run

**NOTE:** You need to have [Node.js](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/) installed and running.

```sh
git clone https://github.com/hiattp/express3-mongodb-bootstrap-demo.git
cd express3-mongodb-bootstrap-demo/
npm install
mv config.example.js config.js
node app.js*
```

If you receive an error about bcrypt_lib, then run `npm install bcrypt`.

Then visit [http://localhost:3000/](http://localhost:3000/).

## Features

1. Node.js Framework ([Express 3](http://expressjs.com/))
2. MongoDB (using the [Mongoose](http://mongoosejs.com/) API)
3. Authentication (using [Passport](http://passportjs.org/))
4. Frontend Templating ([Twitter Bootstrap](http://twitter.github.io/bootstrap/index.html))
5. [jQuery](http://jquery.com/)
6. Mailer (using [Mandrill](http://mandrill.com/))
7. Simple MVC Design
8. User CRUD & Password Recovery
9. Basic Error Handling
10. Form Validation

## License

(The MIT License)

Copyright (c) 2013 Paul Hiatt <[hiattp@gmail.com](mailto:hiattp@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
