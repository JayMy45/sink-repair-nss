//this module will create html code of the request data provided from the database.
//import getRequests function from dataAccess.js (this is where the database is fetched to and data can be accessed as in the title)
import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js";

//declare function to access request of data named convertRequestToListElement

document.addEventListener(
    "click",
    (event) => {
        if (event.target.id.startsWith("request--")) {//add click event to target button at the id specified

            //*** no need to call function to print permanent changes to page. ***//
            //deleteRequest()
        }
    }
)

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)




mainContainer.addEventListener("click", click => {  //click listener for delete button...
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

const convertRequestToListElement = (request) => {

    const plumbers = getPlumbers()

    const completions = getCompletions()

    const foundCompletion = completions.find(
        (completion) => {
            return request.id === completion.requestId
        }
    )

    let html = ''
    if (foundCompletion) {
        html += `<li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>`

    } else {
        html += `
    <li>
        ${request.description}
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
    </select>
    
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
        
`
    }
    return html
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
    </ul>`

    return html
}
