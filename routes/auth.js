var express = require('express');
var router = express.Router();

var multer  = require( 'multer');

//  require v4 as uuidv4 
var { v4: uuidv4 } = require( 'uuid' );
// requ
//var User  = require( '../models/user');



var Auth = require('../controllers/authentication');

// profile
// router.get('/dashboard', auth, Profile.profileRead);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });
// authentication
router.post('/register', Auth.register);
router.post('/login', Auth.login);
 router.post('/updateUser', Auth.updateUser);

router.post('/uploadProfilePic', async (req, res) => {
// get 
      try {
        
     console.log("In the uploading section server side", req.file)
        if (req.file != null) {
    
 console.log("File Found")
        }
        
       // await user.save();
        //res.send({ user });

      } catch (error) {
        res.send(error);
      }


    });



module.exports = router;
