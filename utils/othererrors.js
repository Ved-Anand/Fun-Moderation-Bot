let array = new Array();

array[3148] = "Missing Permissions. \n Reccomended solution: Go to server settings, roles, and make the bot role the highest one. If this does not work, make sure the bot has all the permissions."
array[5621] = "That helpmsg is not recognized."

function getError(err) {
    let id;
    switch (err) {
        case "Missing Permissions": 
            id = "3148"
            break;
        default:
            return "Huh, I don't recognize that message!" 
    }
    return id;
}

function findError(id) {
    let fix = array[id];
    if (fix != undefined) {
        return fix;
    } else {
        return "Error: That help message is not valid. More information can be found by typing $helpmsg 5621"
    }
}
module.exports = {
    getError,
    findError
}