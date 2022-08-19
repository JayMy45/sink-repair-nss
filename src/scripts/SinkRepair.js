import { Request } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"
import { sendRequest } from "./dataAccess.js"

document.addEventListener(
    "click",
    (event) => {
        if (event.target.id.startsWith("button")) {//add click event to target button at the id specified
            sendRequest() //call function to print permanent changes to page.
        }
    }
)


export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
   
    <section class="serviceForm">
        ${ServiceForm()}
    </section>
   
    <section class="serviceRequests">
        <h2>Service Requests</h2>
            ${Request()}
    </section>
    `
}

