const Joi = require('joi');
const customValidator=require('./custom.Validation');
const Values=require('../utils/values');
console.log('Video.Validation.js');

const searchVideo={
    query:Joi.object().keys({
        title: Joi.string(),
        genres: Joi.array().items(Joi.string().valid(...Values.genres,'All')),
        contentRating: Joi.string().valid(...Values.contentRating,'All'),
        sortBy:Joi.string().valid(...Values.sortBy),
    })
}
const getVideo={
    params:Joi.object().keys({
        videoId:Joi.required().custom(customValidator.objectId)
    })
}
const addVideo={
    body:Joi.object().keys({
        videoLink: Joi.string().required().custom(customValidator.videoLink),
        title: Joi.string().required(),
        genre: Joi.string().required().valid(...Values.genres),
        contentRating: Joi.string().required().valid(...Values.contentRating),
        releaseDate: Joi.string().required().custom(customValidator.releaseDate),
        previewImage:Joi.string().uri(),
    })
}
const updateVotes={
    params:Joi.object().keys({
        videoId:Joi.required().custom(customValidator.objectId)
    }),
    body:Joi.object().keys({
        vote:Joi.string().required().valid(...Values.updateVoteTypes),
        change:Joi.string().required().valid(...Values.changeVoteTypes),
    })
}
const updateViews={
    params:Joi.object().keys({
        videoId:Joi.required().custom(customValidator.objectId)
    }),
}
module.exports={
    searchVideo,getVideo,addVideo,updateVotes,updateViews
}