const { Video} = require('../models/video.model');
const VideoModel=require('../models/index');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const videoData = require('../data/videos');
// const { values } = require('../data/videos');
const Values=require('../utils/values');
const { default: mongoose } = require('mongoose');

const getVideosService=async (title,contentRating , genres,sortBy)=>{
    
    const titleMatch={title:{$regex:title, $options:'i'}};
    const contentRatings=getPossibleContentRatings(contentRating);
    const contentRatingMatch={contentRating:{$in:contentRatings}};
    let genreMatch;
    if(genres.length>1){
        let arr=genres.split(',');
        console.log(arr);
        genreMatch={genre:{$in:arr}};
    }
    else{
        genreMatch={genre:{$in:genres}};
    }

    if(genres.includes('All')){
        genreMatch=null
    }
    const videos=await Video.find({
        ...titleMatch,...contentRatingMatch,...genreMatch
    });
    console.log(videos)
    const sortedVideos=sortVideos(videos,sortBy);
    console.log(genreMatch , 'are the required genres');
    return sortedVideos;
}
const getPossibleContentRatings = (contentRating)=>{
    let contentRatings=[...Values.contentRating];
    if(contentRating==='All'){
        return contentRatings
    }
    let contentRatingIndex=contentRatings.indexOf(contentRating);
    let possibleContentRatings=contentRatings.splice(contentRatingIndex);
    return possibleContentRatings;
}
const sortVideos=(videos,sortBy)=>{
    
    videos.sort((v1,v2)=>{
        let field1=v1[sortBy];
        let field2=v2[sortBy];
        
        if(sortBy==='releaseDate'){
            console.log(field1,field2);
            field1=new Date(field1).getTime();
            field2=new Date(field2).getTime();

        }
        if(field1>field2){ return -1;}
        return 1;
    });
    return videos;
}
const findVideobyId=async(id)=>{
    const video=await Video.findById(id);
    if(!video){
        console.log('No Video')
    }
    return video;
}
const getVideoService=async(id)=>{
    const video =await findVideobyId(id);
    console.log('GetVideoService');
    console.log(video)
    return video;
}
const addVideoService=async(videoBody)=>{
    // console.log(videoBody);
    const video=await Video.create(videoBody)
    .catch(err=>{ 
        if(mongoose.Error.ValidationError){
            throw new ApiError(httpStatus.BAD_REQUEST,'Video Link Already Exists.')
        }
      });
    return video
}
const changeVotesService=async(id,voteType,changeType)=>{
    const video=await findVideobyId(id);
    let changeVoteType='';
    if(voteType==='upVote')
    {
        changeVoteType="upVotes";
    }
    else{
        changeVoteType="downVotes";
    }
    const prevVotes=video.votes[changeVoteType];
    let newVotes=prevVotes;
    if(changeType==='increase'){
        newVotes+=1;
    }else{
        newVotes-=1;
    }
    newVotes=Math.max(newVotes,0);
    video.votes[changeVoteType]=newVotes;
    await video.save()
    return;
}
const changeViewsService=async(id)=>{
    const video=await findVideobyId(id);
    video.viewCount+=1;
    await video.save()
    return;
}
module.exports={getVideosService,getVideoService,addVideoService,changeVotesService,changeViewsService}