
const router = require('express').Router();
const { videoController } = require('../controllers/index');
// const {
//     saveVideo,
//     getAllVideos,
//     getVideoById,
//     incrementVideoViewCountById,
//     changeVideoVoteCountById,
//     deleteAll,
//     insertMany,
// } = videoController;
// const {
//     validateJoiSchema_body,
//     validateJoiSchema_params,
//     validateJoiSchema_query,
// } = require('../middleware/validateJoiSchema');
// const videoValidation = require('../validations/video.validation');

// const validateSaveVideo = validateJoiSchema_body(
//     videoValidation.saveVideoValidation
// );

// const validateMongoId = validateJoiSchema_params(videoValidation.mongoId);

// const validateUpdateVotes = validateJoiSchema_body(
//     videoValidation.updateVideoVotes
// );

// const validateGetBySearchQuery = validateJoiSchema_query(
//     videoValidation.getBySearchQuery
// );

const {validate} =require('../middleware/validateJoiSchema.js');
const videoValidation=require('../validations/video.validation')
console.log('In Video Routes ');
router.get('/', validate(videoValidation.searchVideo), videoController.getVideos);
router.get('/:videoId',validate(videoValidation.getVideo),videoController.getVideo);
router.post('/',validate(videoValidation.addVideo),videoController.addVideo);
router.patch('/:videoId/votes',validate(videoValidation.updateVotes),videoController.changeVotes);
router.patch('/:videoId/views',validate(videoValidation.updateViews),videoController.changeViews);
// router.get('/', validateGetBySearchQuery, getAllVideos);

// router.get('/:videoId', validateMongoId, getVideoById);
// router.post('/', validateSaveVideo, saveVideo);

// router.patch('/:videoId/views', validateMongoId, incrementVideoViewCountById);

// router.patch(
//     '/:videoId/votes',
//     validateMongoId,
//     validateUpdateVotes,
//     changeVideoVoteCountById
// );

// router.delete('/delete-all', deleteAll);
// router.post('/insert-many', insertMany);

module.exports = router;