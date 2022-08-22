//this module will create html code of the request data provided from the database.
//import getRequests function from dataAccess.js (this is where the database is fetched to and data can be accessed as in the title)
import { getRequests, deleteRequest } from "./dataAccess.js";

//declare function to access request of data named convertRequestToListElement

document.addEventListener(
    "click",
    (event) => {
        if (event.target.id.startsWith("request--")) {//add click event to target button at the id specified
            deleteRequest() //call function to print permanent changes to page.
        }
    }
)

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {  //click listener for delete button...
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

const convertRequestToListElement = (request) => {
    let html = ''
    return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
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
