let list = require('./data');
const httpStatus = require('./httpStatus');

const { validationResult} = require('express-validator');

const getAllList = (req, res)=>{
    res.send({Status : httpStatus.SUCCESS , Data : list.list})
}

const getById = (req,res)=>{
    const id = +req.params.id;
    
    const person = list.list.find((person)=>person.id===id)
    if (!person) {
        return res.json(({Status : httpStatus.FAIL }))
    }else{
        return res.json({ Status : httpStatus.SUCCESS ,Data : person})
    }
}

const AddNew =(req,res)=>{
    const errors = validationResult(req);
    console.log(req.body);
    console.log(errors);
    if (! errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    
    
    list.list.push({
        id : list.list.length+1,
        ...req.body
    })
    
    res.json({ Status: 'success', Data: { list } });
    console.log(list);
}

const editById = (req,res)=>{
    const id = +req.params.id;
    let person = list.list.find((person)=>person.id==id);
    if (!person) {
        res.json({Status : httpStatus.FAIL , Data : list});
    } else {
        person = { ...person, ...req.body };
        list.list = list.list.map(p => p.id === id ? person : p);  
        res.status(200).json(person);
    }
}

const deleteById = (req,res)=>{
    const id = req.params.id;
    let person = list.list.find((person)=>person.id==id);
    if (!person) {
        res.json(msg,"can't find this id");
    } else {
        list.list = list.list.filter((c) => c.id != person.id);  
        res.status(200).json({ Status: httpStatus.SUCCESS, Data: person });
    }
}

module.exports={
    getAllList,
    getById,
    AddNew,
    editById,
    deleteById
}