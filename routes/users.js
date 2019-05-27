var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
    var options = {
        "sort": { username: 1 },
    };
    // console.log("collection : "+collection);
    //https://docs.mongodb.com/manual/reference/method/db.collection.find/index.html
    //https://stackoverflow.com/questions/21926669/mongodb-sort-not-working-if-limit-is-removed
  collection.find({/*username: { $gt: 'test2' }*/},options,function(e,docs){
      res.json(docs);
  });
  //   collection.find().sort({username:-1},function(e,docs){
  //       res.json(docs);
  //   });
});

/* Search users listing . */
router.post('/searchlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log(req.body);
    var options = {
        //https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
        // username: new RegExp(req.body.username)

        $and:[
            {username: new RegExp(req.body.username)},
            {email: new RegExp(req.body.email)}

        ],
        // "sort": [{ username: 1 }, { email: 1 }]
    }
    console.log(options);
    collection.find(options,{"sort": { username: 1 }/*,"limit" : 5*/},function(e,docs){
        // console.log(docs);
        res.json(docs);
    });
//



});

router.post('/searchemaillist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log(req.body);
    var options = {
        //https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
        email: new RegExp(req.body.email)
    }
    console.log(options);
    collection.find(options,function(e,docs){
        // console.log(docs);
        res.json(docs);
    });
//



});

/* GET details listing. */
router.get('/userdetails', function(req, res) {
    var db = req.db;
    var collection = db.get('userdetails');
    // console.log("detail req.body : "+ req.body.username);
    var options = {
        // "sort": { username: 1 },
    };
    collection.find({},options,function(e,docs){
        res.json(docs);
    });

});

/* POST to adduser. */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
      res.send(
          (err === null) ? { msg: '' } : { msg: err }
      );
  });
});

/* PUT to updateuser. */
router.put('/updateuser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var myquery = {username : req.body.username};
    var newvalues =  req.body;
    console.log("testing");
    console.log(req.body);
    console.log(myquery.username);
    console.log(req.body.username);
    console.log(myquery.username == req.body.username);
    // console.log(newvalues);
    // console.log(collection);
    collection.update(myquery, newvalues,{ upsert: false },function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.put('/updateuserdetails/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userdetails');
    var processid = req.params.id;
    var myquery = { '_id'  : processid };
    console.log("processid " + processid);
    // var myquery = {username : req.body.username};
    console.log( myquery);
    console.log( req.body);


    var newvalues =  req.body;

    if (processid != 'toadd'){

    collection.update(myquery, newvalues,{ upsert: true },function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });}
    else // process id == 'toadd'
    {
        collection.insert(req.body, function(err, result){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        });
    }
});


/*
  DELETE to delete user.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deleteuserdatails/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userdetails');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
