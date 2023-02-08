const objectId=(value,helpers)=>{
    if(!value.match(/^[0-9a-fA-F]{24}$/)){
        return helpers.message("{{#label}} must be a valid mongo id.")
    }
    return value
}
const videoLink=(value,helpers)=>{
    if(!value.match(/^ ((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?.[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+) /))
    {
        return helpers.message("Invalid youtube link")
    }
    return value
}

const releaseDate=(value,helpers)=>{
    if(!value.match(/^(([0-9])|([0-2][0-9])|([3][0-1]))(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)){
        return helpers.message("Invalid release Date")
    }
    return value
}
module.exports={
    objectId,releaseDate,videoLink
}