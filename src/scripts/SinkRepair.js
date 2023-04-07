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
    <div>
        <h1>Maude and Merle's Sink Repair</h1>
    </div>  

    <div>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>
    </div>

   <div>
        <section class="serviceRequests">
            <div>
                <div>
                    <h2>Service Requests</h2>
                </div>
                <div>
                    <div class="request__completed-by">
                    
                            <h3 class="repair__description">Description</h3>

                        <div class="request__list-description__2">             
                            <h3>Completed By</h3>
                        </div>

                        <div class="request__list-description__3">             
                            <h3>Delete</h3>
                        </div>
                    </div>

                    <div>
                        ${Request()}
                    </div>
                </div>
            </div>
        </section>
    </div>
    `
}

