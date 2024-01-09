const Media = require('../Models/Media')

exports.getAll = async (req, res) => {
    try{
       const media = await Media.find()
       res.json(media)
    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

// method of create
exports.create = async (req, res) => {
    // have to store two thing
    //1. name, videos
    const {name} = req.body
    let videosPaths = []

   if(Array.isArray(req.files.videos) && req.files.length>0){
    for(let video of req.files.videos){
        videosPaths.push('/' + path.relative('public', video.path));
    }
   }

   try{
    const createdMedia = await Media.create({
        name,
        videos: videosPaths
    })
    res.json({message: 'Media created Successfully', createdMedia})
   }
   catch(error){
    console.log(error);
    res.status(400).json(error)
   }
}