var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authentication');
// linking createquiz file
var createQuiz = require('../controllers/quiz/createQuiz');
var deleteQuiz = require('../controllers/quiz/deleteQuiz');
var modifyQuiz = require('../controllers/quiz/modifyQuiz');
var uploadQuestionImage = require('../controllers/quiz/uploadquestionimage');
// calling "createquiz" function of createQuiz.js file
router.post('/createquiz', createQuiz.createquiz);
router.post('/deletequiz', deleteQuiz.deletequiz);
router.post('/modifyquiz', modifyQuiz.modifyquiz);


var multer = require('multer')
var path = require('path');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var storage = multer.diskStorage({
    destination: 'uploads'
    ,
    filename: (req, file, cb) => {
        cb(null, req.file.name + '-' + Date.now())
    }
})


var  upload = multer({storage: storage })


router.post('/uploadquestionimage', upload.single("question_image"), uploadQuestionImage.uploadquestionimage);
module.exports = router
