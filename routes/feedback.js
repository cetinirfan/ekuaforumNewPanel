const express = require('express')
const router = express.Router();
const Feedback = require('../services/modals/Feedback');
const moment = require('moment');
require('moment/locale/tr');
const verifyToken = require('../services/middleware/verify-token');

router.get('/feedback',verifyToken,(req,res)=>{
    Feedback.find({feedBackType:0},(err,find_feedback)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('feedback.ejs',{
            find_feedback,
            moment,
            title:'Yeni Bildirimler'
        })
    }).sort({'feedBackCreated':-1});
});

router.get('/validationFeedback',verifyToken,(req,res)=>{
    Feedback.find({feedBackType:1},(err,find_feedback)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('validationfeedback.ejs',{
            find_feedback,
            moment,
            title:'Okunan Bildirimler'
        })
    });
});

router.get('/deleteFeedBack/:id',verifyToken,(req,res)=>{
    Feedback.remove({_id:req.params.id},(err,find_feedback)=>{
        if(err){
            return res.render('error.ejs');
        }
        return res.send("<script> alert('Geri Bildirim Başarıyla Silindi'); window.location = '/../../feedback/feedback/'; </script>")
    });

});

router.get('/validationFeedBack/:_id',verifyToken,(req,res)=>{
    Feedback.updateOne({_id:req.params._id},{$set:{feedBackType:1}},(err,find_user)=>{
        if(err){
            return res.render('error.ejs');
        }
        return res.send("<script> alert('Geri Bildirim okundu.'); window.location = '../../feedback/feedback/'; </script>")
    });
});

module.exports = router;
