//this module will create html code of the request data provided from the database.
//import getRequests function from dataAccess.js (this is where the database is fetched to and data can be accessed as in the title)
import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

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
        html += `<li class="no-bullets">
                    <div class="request__list-complete">
                        <div>
                            <span class="request__list-description__1">
                                ${request.description}
                            </span>
                        </div>
                        <div>
                        <span class="request__list-description__2">
                           Completed
                        </span>
                    </div>
                        <div class="request__list-description__3">
                            <button class="request__delete" id="request--${request.id}">
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
                `

    } else {
        html += `<li class="no-bullets">
                    <div class="request__list-incomplete">
                            <div>
                                <span class="request__list-description__1">                    
                                    ${request.description}
                                </span>
                            </div>                        
                            <div class="request__list-description__2">
                                <select class="plumbers" id="plumbers">
                                    <option value="">
                                    Choose
                                    </option>
                                    ${plumbers.map(plumber => { return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>` }).join("")}
                                </select>
                            </div>
                            <div class="request__list-description__3">
                                <button class="request__delete"
                                        id="request--${request.id}">
                                    Delete
                                </button>
                            </div>
                    </div>
                </li>
        
`
    }
    return html
}


//declare export function to modulate requests.
export const Request = () => {

    const requests = getRequests() //invoking getRequests inside functions allows for site-directed options(?)

    //declare/define variable to store invoked getRequest function imported from dataAccess.js

    //using .map method iterate the request and create unordered list (may need to take a look at old code from kneel diamonds)
    let html = `
    <div class="">
        <ul>
            ${requests.map(convertRequestToListElement).join("")
        }
        </ul>
        </div>
    `

    return html
}
