import { fetchRequests, fetchPlumbers, fetchCompletion } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"



export const mainContainer = document.querySelector("#container")


// *** second iteration of render() function with fetchPlumbers added...
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletion())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

// **** first iteration of render function that only invoked fetchRequests function.
// const render = () => {
//     fetchRequests()
//     .then(
//         () => {
//             mainContainer.innerHTML = SinkRepair()
//         }
//     )
// }

// render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

