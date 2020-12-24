class Namespace {
    constructor(id, nsTitle, image, endpoint){
        this.id = id;
        this.image = image;
        this.nsTitle = nsTitle;
        this.endpoint = endpoint;
        this.rooms = [];
    }
    addRoom(roomObj){
        this.rooms.push(roomObj)
    }
}
module.exports = Namespace;