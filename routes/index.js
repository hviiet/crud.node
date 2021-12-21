var express = require('express');
var router = express.Router();
var dbConnect = require('../database/connect');

//home page(read)
router.get('/', function(req, res, next) {
  dbConnect.query(`SELECT * FROM customers`,function(err,data){
    if(err) throw err;
    res.render('index',{data:data});
  });
});
//create
router.get('/add', function(req, res) {
    res.render('add');
});
router.post('/add', function(req, res) {
  dbConnect.query(`INSERT INTO customers (id, last_name, first_name) VALUES('${req.body.id}', '${req.body.last_name}', '${req.body.first_name}') ` ,function(err){
    if(err) throw err;
    res.redirect('/');
  });
});
//delete
router.get('/delete/:id',function(req,res){
  dbConnect.query(`DELETE FROM customers WHERE id = ${req.params.id}`,function(err){
    if(err) throw err;
    res.redirect('/');
  });
});
//update
router.get("/edit/:adr",function(req,res){
  var data = dbConnect.query(`SELECT *   FROM customers WHERE id = ${req.params.adr}`,function(err,result){
    if(err) throw err;
    data = {
      adr : result[0].adr,
      id : result[0].id,
      first_name : result[0].first_name,
      last_name : result[0].last_name,
    };
    res.render('edit',{data});
  });
});
router.post('/edit', function(req,res){
  dbConnect.query(`UPDATE customers SET id='${req.body.id}', first_name='${req.body.first_name}', last_name='${req.body.last_name}'`,function(err){
    if(err) throw err;
    res.redirect('/');
  })
})

module.exports = router;
