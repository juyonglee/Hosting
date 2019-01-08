const express  = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');

const Dust     = require('../models/dust');

// Index
router.get('/',
    function(req, res, next){
        Dust.find({})
            .then((dusts) => {
                res.json(dusts);
            }).catch((err) => {
            next(err);
        })
    }
);

// Show
router.get('/:id',
    function(req, res, next){
        getDust(req.params.id).then((dusts) => {
            if (!dusts) {
                return next(Boom.notFound("dusts not found"));
            }
            res.json(dusts);
        }).catch((err) => {
            next(err);
        })
    }
);

function getDust(id) {
    return Dust.findById(id);
}

// Create
router.post('/',
    function(req, res, next){
    console.log('create dusts');
        Dust.findOne({})
            .sort({id: -1})
            .exec(function(err, dusts){
                if(err) {
                    res.status(500);
                    return res.json({success:false, message:err});
                }
                else {
                    res.locals.lastId = dusts?dusts.id:0;
                    next();
                }
            });
    },
    function(req, res, next){
        var newDust = new Dust(req.body);
        newDust.id = res.locals.lastId + 1;
        newDust.save(function(err, dust){
            if(err) {
                res.status(500);
                res.json({success:false, message:err});
            }
            else {
                res.json({success:true, data:dust});
            }
        });
    }
);

// Update
router.put('/:id',
    function(req, res, next){
        console.log('req.params.id==>', req);
        Dust.findOneAndUpdate({id:req.params.id}, req.body)
            .exec(function(err, dustLocation){
                if(err) {
                    res.status(500);
                    res.json({success:false, message:err});
                }
                else if(!dustLocation){
                    res.json({success:false, message:"dustLocation not found"});
                }
                else {
                    res.json({success:true});
                }
            });
    }
);

// Destroy
router.delete('/:id',
    function(req, res, next){
        Dust.findOneAndRemove({id:req.params.id})
            .exec(function(err, dust){
                if(err) {
                    res.status(500);
                    res.json({success:false, message:err});
                }
                else if(!dust){
                    res.json({success:false, message:"company not found"});
                }
                else {
                    res.json({success:true});
                }
            });
    }
);

// Create
router.post('/dust-config',
    function(req, res, next){
        console.log('create dusts config');
        Dust.findOne({})
            .sort({id: -1})
            .exec(function(err, dusts){
                if(err) {
                    res.status(500);
                    return res.json({success:false, message:err});
                }
                else {
                    res.locals.lastId = dusts?dusts.id:0;
                    next();
                }
            });
    },
    function(req, res, next){
        var newDust = new Dust(req.body);
        newDust.id = res.locals.lastId + 1;
        newDust.save(function(err, dust){
            if(err) {
                res.status(500);
                res.json({success:false, message:err});
            }
            else {
                res.json({success:true, data:dust});
            }
        });
    }
);

module.exports = router;
