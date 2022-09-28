const mongoose = require('mongoose');
var fs = require('fs');
// accessing schema of quiz
const Quiz = require('../../models/Quiz');
const { response } = require('express');
var imgModel = require('../../models/Image')
var multer = require('multer')
var path = require('path');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);




// updating quiz
module.exports.uploadquestionimage = async (req, res) => {

 console.log(req.files)
    if (req.busboy) {
        req.busboy.on('file', (name, file, info) => {
          // ...
          console.log("Uploading: " + appDir); 
          // ssave file in mongodb as a blob 
          
       


          imgModel.create(obj, () => {
            if(err) {
              console.oog(err)
            }

            else {
            console.log("Uploaded the image")
            }
          })




        });
        req.busboy.on('field', (name, value, info) => {
          // ...
        });
        req.pipe(req.busboy);
      }

};
