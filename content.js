// Content script
// Inject the backend module into the page
const wasmURL = chrome.runtime.getURL('backend.wasm');
const importObject = {}; // Configure import object if required
const wasmInstance = await WebAssembly.instantiateStreaming(fetch(wasmURL), importObject);
const backendModule = wasmInstance.exports;

// Interact with the page and send data to the backend
// Example: Capture data and connect with user-provided molecules
const userMolecules = [
  // Add your user-provided molecules here
  // Example: { name: "Molecule 1", data: "Molecule data 1" },
  //          { name: "Molecule 2", data: "Molecule data 2" },
];

// Listen for data events on the UCSC Genome project page
document.addEventListener('dataEvent', function(event) {
  const data = event.detail; // Extract the data from the event
  // Connect data with user-provided molecules using the backend module
  const connectedMolecules = backendModule.connectDataWithMolecules(data, userMolecules);
  // Visualize the interaction using OpenMM
  backendModule.visualizeInteraction(data, connectedMolecules);
});

// Emit a data event to trigger data processing
function emitDataEvent(data) {
  const event = new CustomEvent('dataEvent', { detail: data });
  document.dispatchEvent(event);
}

// Example: Emit a data event when a button is clicked
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const buttonText = event.target.textContent;
    emitDataEvent(buttonText);
  }
});
