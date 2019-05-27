var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/pmtopicslist', function(req, res) {
  var db = req.db;
  var collection = db.get('pmtopicslist');
    var options = {
        "sort": {Group_No: 1,   Management_No: 1}
    };
  collection.find({/*username: { $gt: 'test2' }*/},options,function(e,docs){
      res.json(docs);
  });
  //   collection.find().sort({username:-1},function(e,docs){
  //       res.json(docs);
  //   });
});

router.get('/pminputslist', function(req, res) {
    var db = req.db;
    var collection = db.get('pminputslist');
    var options = {
        "sort": {Input: 1}
    };
    collection.find({/*username: { $gt: 'test2' }*/},options,function(e,docs){
        res.json(docs);
    });
    //   collection.find().sort({username:-1},function(e,docs){
    //       res.json(docs);
    //   });
});

router.get('/pmtoolslist', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtoolslist');
    var options = {
        "sort": {Tool: 1}
    };
    collection.find({/*username: { $gt: 'test2' }*/},options,function(e,docs){
        res.json(docs);
    });
    //   collection.find().sort({username:-1},function(e,docs){
    //       res.json(docs);
    //   });
});

router.get('/pmoutputslist', function(req, res) {
    var db = req.db;
    var collection = db.get('pmoutputslist');
    var options = {
        "sort": {Output: 1}
    };
    collection.find({/*username: { $gt: 'test2' }*/},options,function(e,docs){
        res.json(docs);
    });
    //   collection.find().sort({username:-1},function(e,docs){
    //       res.json(docs);
    //   });
});

/* Search users listing . */
router.post('/searchtopicslist', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtopicslist');
    console.log(req.body);
    var options = {
        //https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
        // username: new RegExp(req.body.username)

        $and:[
            {Topic: new RegExp(req.body.Topic)},
            {Group_No: new RegExp(req.body.Group_No)},
            {Management_No: new RegExp(req.body.Management_No)},
        ],
        // "sort": [{ username: 1 }, { email: 1 }]
    }
    console.log(options);
    collection.find(options,{"sort": { Group_No: 1,   Management_No: 1 }/*,"limit" : 5*/},function(e,docs){
        // console.log(docs);
        res.json(docs);
    });
//



});

router.post('/searchemaillist', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtopicslist');
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
router.get('/topicsInput', function(req, res) {
    var db = req.db;
    var collection = db.get('pminputslist');
    // console.log("detail req.body : "+ req.body.username);
    var options = {
        "sort": { Reference: 1 },
    };
    collection.find({},options,function(e,docs){
        res.json(docs);
    });

});

router.get('/topicsTool', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtoolslist');
    // console.log("detail req.body : "+ req.body.username);
    var options = {
        "sort": { Reference: 1 },
    };
    collection.find({},options,function(e,docs){
        res.json(docs);
    });

});

router.get('/topicsOutput', function(req, res) {
    var db = req.db;
    var collection = db.get('pmoutputslist');
    // console.log("detail req.body : "+ req.body.username);
    var options = {
        "sort": { Reference: 1 },
    };
    collection.find({},options,function(e,docs){
        res.json(docs);
    });

});
/* POST to adduser. */
router.post('/addtopics', function(req, res) {
  var db = req.db;
  var collection = db.get('pmtopicslist');
  collection.insert(req.body, function(err, result){
      res.send(
          (err === null) ? { msg: '' } : { msg: err }
      );
  });
});

/* PUT to updateuser. */
router.put('/updatetopic', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtopicslist');
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

router.put('/updatetopics/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtopicslist');
    var processid = req.params.id;
    var myquery = { '_id'  : processid };
    console.log("processid " + processid);
    // var myquery = {username : req.body.username};
    console.log( myquery);
    console.log( req.body);


    var newvalues =  req.body;

    if (processid != 'toadd'){
        console.log( "processid != 'toadd'");
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

router.put('/updateinputs/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pminputslist');
    var processid = req.params.id;
    var myquery = { '_id'  : processid };
    console.log("processid " + processid);
    // var myquery = {username : req.body.username};
    console.log( myquery);
    console.log( req.body);


    var newvalues =  req.body;

    if (processid != 'toadd'){
        console.log( "processid != 'toadd'");
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

router.put('/updatetools/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtoolslist');
    var processid = req.params.id;
    var myquery = { '_id'  : processid };
    console.log("processid " + processid);
    // var myquery = {username : req.body.username};
    console.log( myquery);
    console.log( req.body);


    var newvalues =  req.body;

    if (processid != 'toadd'){
        console.log( "processid != 'toadd'");
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

router.put('/updateoutputs/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmoutputslist');
    var processid = req.params.id;
    var myquery = { '_id'  : processid };
    console.log("processid " + processid);
    // var myquery = {username : req.body.username};
    console.log( myquery);
    console.log( req.body);


    var newvalues =  req.body;

    if (processid != 'toadd'){
        console.log( "processid != 'toadd'");
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
router.delete('/deletetopic/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtopicslist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deleteinputs/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pminputslist');
    var itemToDelete = req.params.id;
    collection.remove({ '_id' : itemToDelete  }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deletetools/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmtoolslist');
    var itemToDelete  = req.params.id;
    collection.remove({ '_id' : itemToDelete  }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.delete('/deleteoutputs/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('pmoutputslist');
    var itemToDelete  = req.params.id;
    collection.remove({ '_id' : itemToDelete  }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
