Description
=======

A REST API with a MongoDB backend. 

Installation
=======

Clone the repo
--------

```bash
git clone https://github...git
```

Start MongoDB
-----

```bash
mongod
```

Install the Dependancies
---------

```bash
npm install
```

Create the `.env` File
----

```bash
echo 'PORT=8888\nDB_URI=mongodb://localhost:27017/meganote' > .env
```

Start the server
------

```bash
npm start
```

or

```bash
npm run dev
```

for automatic deployment after node file modification

Connection
======

With these instructions the server will listen to port 8888 so sending a GET request to

```
http://localhost:8888/
```

should return a list of all the created notes
