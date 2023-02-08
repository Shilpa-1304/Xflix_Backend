const { getVideosService ,getVideoService,addVideoService,changeVotesService,changeViewsService} = require('../services/video.services');
const catchAsync = require('../utils/catchAsync');

const getVideos=catchAsync(async(req,res)=>{
    const title=req.query.title ? req.query.title : '';
    const contentRating=req.query.contentRating?req.query.contentRating:'All';
    const genres=req.query.genres?req.query.genres:['All'];
    const sortBy=req.query.sortBy?req.query.sortBy:'releaseDate';
    console.log(genres, 'is/are genres');
    // let genreArr=genres.split(',');
    // console.log(genreArr, 'is/are genres');
    const videos=await getVideosService(title,contentRating,genres,sortBy);
    
    res.status(200).send({videos: videos});
})

const getVideo=catchAsync(async(req,res)=>{
    const video=await getVideoService(req.params.videoId);
    console.log(video);
    res.status(200).send(video);
})
const addVideo = catchAsync(async (req, res) => {
    console.log('Inside AddVideo controller function ')
    const result = await addVideoService(req.body);
    console.log('result');
    res.status(201).send(result);
});
const changeVotes=catchAsync(async(req,res)=>{
    await changeVotesService(req.params.videoId,req.body.vote,req.body.change);
    res.status(204).send();
});
const changeViews=catchAsync(async(req,res)=>{
    await changeViewsService(req.params.videoId);
    res.status(204).send();
})
module.exports={getVideos,getVideo,addVideo,changeVotes,changeViews}