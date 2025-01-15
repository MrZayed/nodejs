const express= require('express')
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const {body , validationResult} = require('express-validator');

const controller = require('./Controller')

app.use(express.json());

app.get('/', controller.getAllList);

app.get('/:id', controller.getById);

app.post('/',
    controller.AddNew);

app.patch('/:id', controller.editById);

app.delete('/:id', controller.deleteById)


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

app.listen(5000,()=>{
    console.log("the server is running in port 5000");

})