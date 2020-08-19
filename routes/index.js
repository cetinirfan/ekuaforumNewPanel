const express = require('express');
const router = express.Router();
const Feedback = require('../services/modals/Feedback');
const Operatings = require('../services/modals/Operatings');
const verifyToken = require('../services/middleware/verify-token');

router.get('/',verifyToken, (req, res, next) => {
  Feedback.find({feedBackType:0},(err,find_feedback)=>{
    if(err){
        return res.render('error.ejs');
    }
    Operatings.find({operatingType:0},(err,find_operating)=>{
        if(err){
            return res.render('error.ejs');
        }
        res.render('index.ejs',{
            find_feedback,
            find_operating,
        })
  })
})
});
module.exports = router;
