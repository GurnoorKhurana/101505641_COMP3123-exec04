const express = require('express');

const SERVER_PORT = process.env.PORT || 3000;

// Create instance of express app
const app = express();

//serve static files from public folder
// app.use(express.static('public'));
app.use('/static', express.static('public'));

// middleware to parse json body
app.use(express.json());
// middleware to parse urlencoded body
app.use(express.urlencoded({ extended: true }));


//http://localhost:3000/
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Hello World');
})

// //http://localhost:3000/index
// app.get('/index', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

//http://localhost:3000/about
app.get('/about', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.send('<h1>About Us</h1> <p>This is the about us page</p>');
})
//http://localhost:3000/students
app.put('/students', (req, res) => {
    const students = { method: "PUT", name: 'John Doe', age: 25, major: "Computer Science" }
    res.json(students)
});

//http://localhost:3000/students
app.delete('/students', (req, res) => {
    const students = { method: "DELETE", name: 'John Doe', age: 25, major: "Computer Science" }
    res.json(students)
});
//http://localhost:3000/students
app.post('/students', (req, res) => {
    const students = { method: "POST", name: 'John Doe', age: 25, major: "Computer Science" }
    res.json(students)
});

//http://localhost:3000/students
app.get('/students', (req, res) => {
    const students = { method: "GET", name: 'John Doe', age: 25, major: "Computer Science" }
    res.json(students)
});

// Query Parameter
// http://localhost:3000/employee?name=John&age=25
app.get('/employee', (req, res) => {
    console.log(req.query);

    // const { name: n, age: a } = req.query;

    //Validation for query parameters
    if(req.query.name === undefined || req.query.age === undefined) {
        res.status(400);
        return res.send({status: false, message: 'Bad Request - name and age are required query parameters'});
        
    }


    const name = req.query.name;
    const age = req.query.age;


    res.type('application/json');
    res.json({status:true, data: { name: name, age: age }});
});
    
// Path or Route Parameter
// http://localhost:3000/employee/John/20/Toronto
app.get('/employee/:name/:age/:city', (req, res) => {
    console.log(req.params);

    //Validation for path parameters
    if(req.params.name === undefined || req.params.age === undefined || req.params.city === undefined) {
        res.status(400);
        return res.send({status: false, message: 'Bad Request - name, age and city are required path parameters'});
    }

    const { name, age, city } = req.params;
    res.type('application/json');
    res.json({status:true, data: { name, age, city }});
});

// Body Parameter
// {"name": "John", "age": 25, "city": "Toronto"}
// Use Postman or REST Client extension to test this JSON body
//Content-Type: application/json

// http://localhost:3000/employee

app.post('/employee', (req, res) => {
    app.use(express.json());
    console.log(req.body);

    //Validation for body parameters
    if(req.body.name === undefined || req.body.age === undefined || req.body.city === undefined) {
        res.status(400);
        return res.send({status: false, message: 'Bad Request - name, age and city are required body parameters'});
    }
    const { name, age, city } = req.body;
    res.type('application/json');
    res.json({status:true, data: { name, age, city }});
});

 const server = app.listen(SERVER_PORT, () => {
 console.log(`Server started on port http://localhost:${SERVER_PORT}`);
 console.log(server.address());
})