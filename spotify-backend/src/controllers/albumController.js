import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    console.log("album add called ")
    // console.log(req.body)
    // console.log(req.file)

    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        // console.log("image upload : ", typeof(imageUpload.secure_url))

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
        };

        const album = albumModel(albumData);

        console.log("album : ", album)
        await album.save();

        res.json({ success: true, message: "Album Added" });
        

    } catch (error) {
        console.log(error)

        res.json({ success: false });
        
    }

}

const listAlbum = async (req, res) => {

    try {

        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });

    } catch (error) {

        res.json({ success: false });

    }

}

const removeAlbum = async (req, res) => {

    try {

        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album Removed" });

    } catch (error) {

        res.json({ success: false });
        
    }

}

export { addAlbum, listAlbum, removeAlbum   }