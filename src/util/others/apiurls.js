const jikanbase = "https://api.jikan.moe/v3"
module.exports = {
    jikan: {
        base: jikanbase,
        search: `${jikanbase}/search` /* Usage : search/{type : anime, manga, person, character} then query */
    }
}