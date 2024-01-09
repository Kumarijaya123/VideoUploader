const express = require("express")
const mediaController = require('../controllers/mediaController')
const multer = require('multer') // multer -> to upload the file and video in nodejs
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        if(!fs.existsSync('public')){  // it will tell that this file name exist in folder or not if not then show false otherwose true
            fs.mkdirSync('public')  // if not exist then we will create
        }
        if(!fs.existsSync('public/videos')){
            fs.mkdirSync('public/videos')  // create folder if there is no folder in public
        }
        cb(null, 'public/videos') // in destination there will be public in which create folder where we store vidoes
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({
    // storage ye dikhayega ki kha pe ye store krega
    storage: storage,
    fileFilter: function(req, file, cb){
        var ext = path.extname(file.originalname) // isme filename ka name dena hai jisme ye khud extension apne ap de dega
        if(ext !== '.mkv' && ext !== '.mp4'){
            return cb(new Error('Only videos!'))
        }
        cb(null, true)  
    }
})

const router = express.Router()

// get all media
router.get('/all', mediaController.getAll)

// we will create an POST API to how to upload video
// pass middleware
router.post('/create',upload.fields([
    // create array of objects
    {
        name: "videos",
        maxCount:10,
    }
]), mediaController.create)

module.exports = router