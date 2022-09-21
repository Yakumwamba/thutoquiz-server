const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const { response } = require('express');

module.exports.register = async(req, res) => {
  const user = new User(req.body);

  try {
        await user.save()
        var response = {
            "success": true,
            "data" : {
                "user_id" : user._id
            }
        }
        res.status(201).json(response)
    } catch (e) {
        var response = {
            "success": false,
            "error": {
                "message" : e.message
            }
        }
        res.status(400).json(response)
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = user.generateJwt();
        
        var response = {
            "success": true,
            "data": {
                user: {
                    "_id": user._id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                },
                token: token
            }
        }
        res.json(response);
    } catch (e) {
        var response = {
            "success": false,
            "error": {
                "message" : e.message
            }
        }
        res.status(400).json(response)
    }
};
// router.post('/updateProfile', auth, upload.single('profileImage'), async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     const profile = await Profile.findOne({ user: req.user._id });
//     if (req.file) {
//       profile.profileImage = req.file.path;
//     }
//     profile.name = req.body.name;
//     profile.email = req.body.email;
//     profile.password = req.body.password;
//     profile.role = req.body.role;
//     await profile.save();
//     res.send({ user, profile });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
module.exports.updateUser = async (req, res, next) => { 




    try {
        const user = await User.findById(req.body._id);
        user.username = req.body.username;
        user.email = req.body.email;
        user.role = req.body.role;
        user.profilePic = "req.body.profilePic";
        await user.save();
        var response = {
            "success": true,
            "data": {
                user: {
                    "_id": user._id,
                    "email": user.email,
                    "username": user.username,
                    "profilePic": user.profilePic,
                    "role": user.role,
                }
            }
        }
        res.json(response);
    } catch (e) {
        var response = {
            "success": false,
            "error": {
                "message" : e.message
            }
        }
        res.status(400).json(response)
    }
};



module.exports.verifyToken = (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'MY_SECRET')
        const user =   User.findOne({ _id: decoded._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401).json({ 
            "success": false,
            "error": {
                "message": "Access Denied."
            } 
        })
    }
}
