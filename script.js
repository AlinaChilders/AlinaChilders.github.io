// Create Audio Context
const audioCtx = new AudioContext();

//------------- MODULATION OSCILLATOR---------------
let modOsc = audioCtx.createOscillator();
modOsc.type = "sine";
modOsc.frequency.value = 0.5;

//------------- MODULATION DEPTH---------------
let modDepth = audioCtx.createGain();
modDepth.gain.value = 20;

//------------- CARRIER OSCILLATOR---------------
let carrierOsc = audioCtx.createOscillator();
carrierOsc.type = "sine";
carrierOsc.frequency.value = 440;

//------------- GAIN NODE ---------------
let newGain = audioCtx.createGain();
newGain.gain.value = 0.5;

//Connect Nodes for Flanger Effect
modOsc.connect(modDepth);
modDepth.connect(carrierOsc.frequency);

carrierOsc.connect(newGain);
newGain.connect(audioCtx.destination);

// Start Oscillator
const startAudio = function () {
  audioCtx.resume();
  modOsc.start();
  carrierOsc.start();
};

// Stop Oscillator
const stopAudio = function () {
  modOsc.stop();
  carrierOsc.stop();
};

// UI Control Setup
const updateGain = function (event) {
  newGain.gain.value = parseFloat(event.target.value);
};
const updateDepth = function (event) {
  let depth = parseFloat(event.target.value);
  modDepth.gain.setTargetAtTime(depth, audioCtx.currentTime, 0.1);
};
const updateRate = function (event) {
  let rate = parseFloat(event.target.value);
  modOsc.frequency.setTargetAtTime(rate, audioCtx.currentTime, 0.1);
};
const updateCarrier = function (event) {
  let carrier = parseFloat(event.target.value);
  modOsc.frequency.setTargetAtTime(carrier, audioCtx.currentTime, 0.1);
};

//Start Button
let startButton = document.getElementById("startAudio");
startButton.addEventListener("click", startAudio);

//Stop Button
let stopButton = document.getElementById("stopAudio");
stopButton.addEventListener("click", stopAudio);

//UI Controls
let gainControl = document.getElementById("gain");
let depthControl = document.getElementById("modDepth");
let modRate = document.getElementById("modRate");
let carrierControl = document.getElementById("carrierFreq");

gainControl.addEventListener("input", updateGain);
depthControl.addEventListener("input", updateDepth);
modRate.addEventListener("input", updateRate);
carrierControl.addEventListener("input", updateCarrier);
