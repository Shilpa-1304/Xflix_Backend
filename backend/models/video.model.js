const mongoose = require('mongoose');
const Values=require('../utils/values');
const validator=require('mongoose-unique-validator');
const genres=Values.genres;
const contentRatings=Values.contentRating;
const videoSchema = mongoose.Schema({

    title: { type: String, required: true, trim: true },
    videoLink: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        },
    contentRating: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!contentRatings.includes(value)){
                throw new Error('Invalid Content Rating')
            }
        }
    },
    genre: {
        type: String,
        required: true,
        trim:true,
        validate(value){
            if(!genres.includes(value)){
                throw new Error('Invalid Genre Error')
            }
        }
    },
    releaseDate: { type: String, required: true ,trim:true,},
    previewImage: { type: String, trim: true ,default:''},
    viewCount: { type: Number, default: 0, min: 0 },
    votes:{
        upVotes:{type:Number,default:0},downVotes:{type:Number,default:0}
    }

    
});

videoSchema.plugin(validator,{message:'must be unique'});
const Video = mongoose.model("Video", videoSchema);

/**
 * @typedef Video
 */
module.exports.Video = Video;