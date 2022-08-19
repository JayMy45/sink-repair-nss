//this module will create html code of the request data provided from the database.
//import getRequests function from dataAccess.js (this is where the database is fetched to and data can be accessed as in the title)
import { getRequests } from "./dataAccess.js";

//declare function to access request of data named convertRequestToListElement

const convertRequestToListElement = (request) => {
    let html = ''
    return html = `<li>${request.description} </li>`
}


//declare export function to modulate requests.
export const Request = () => {

    //declare/define variable to store invoked getRequest function imported from dataAccess.js
    const requests = getRequests() //invoking getRequests inside functions allows for site-directed options(?)

    //using .map method iterate the request and create unordered list (may need to take a look at old code from kneel diamonds)
    let html = `
    <ul>
        ${requests.map(convertRequestToListElement).join("")
        }
    </ul>
`

    return html
}
