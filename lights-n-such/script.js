const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const guide = document.getElementById('keymap');
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const keyLayout = [ //ledInex, x, y, width, height
    [0, 0, 0, 50, 45], // esc
    [1, 95, 0, 44, 45], // f keys
    [2, 140, 0, 44, 45],
    [3, 185, 0, 44, 45],
    [4, 230, 0, 44, 45],
    [5, 295, 0, 44, 45],
    [6, 340, 0, 44, 45],
    [7, 385, 0, 44, 45],
    [8, 430, 0, 44, 45],
    [9, 495, 0, 44, 45],
    [10, 540, 0, 44, 45],
    [11, 585, 0, 44, 45],
    [12, 630, 0, 44, 45],

    [14, 685, 0, 44, 45], // PrntScreen
    [15, 730, 0, 44, 45], // Scrlk
    [16, 775, 0, 44, 45], // Pause

    [21, 0, 46, 49, 49], // tilde
    [22, 50, 46, 44, 49], // numbers
    [23, 95, 46, 44, 49], 
    [24, 140, 46, 44, 49], 
    [25, 185, 46, 44, 49], 
    [26, 230, 46, 44, 49], 
    [27, 275, 46, 39, 49], 
    [28, 315, 46, 44, 49], 
    [29, 360, 46, 44, 49], 
    [30, 405, 46, 44, 49], 
    [31, 450, 46, 44, 49], 
    [32, 495, 46, 44, 49], 
    [33, 540, 46, 44, 49], 
    [34, 585, 46, 89, 49], // backspace 

    [35, 685, 46, 44, 49], // Ins
    [36, 730, 46, 44, 49], // Home
    [37, 775, 46, 44, 49], // PgUp

    [38, 830, 46, 44, 49], // Numlk
    [39, 875, 46, 44, 49], // /
    [40, 920, 46, 44, 49], // *
    [41, 965, 46, 44, 49], // -

    [42, 0, 95, 74, 44], // tab
    [43, 75, 95, 44, 44],
    [44, 120, 95, 44, 44],
    [45, 165, 95, 39, 44],
    [46, 205, 95, 44, 44],
    [47, 250, 95, 44, 44],
    [48, 295, 95, 44, 44],
    [49, 340, 95, 44, 44],
    [50, 385, 95, 44, 44],
    [51, 430, 95, 44, 44],
    [52, 475, 95, 44, 44],
    [53, 520, 95, 44, 44], // [
    [54, 565, 95, 44, 44], // ]
    [55, 610, 95, 64, 44], // \

    [56, 685, 95, 44, 44], // Del
    [57, 730, 95, 44, 44], // End
    [58, 775, 95, 44, 44], // PgDn

    [59, 830, 95, 44, 44], // 7
    [60, 875, 95, 44, 44], // 8
    [61, 920, 95, 44, 44], // 9

    [62, 965, 95, 44, 89], // numpd+

    [63, 0, 140, 84, 44], // capslock
    [64, 85, 140, 44, 44], 
    [65, 130, 140, 44, 44], 
    [66, 175, 140, 44, 44], 
    [67, 220, 140, 44, 44], 
    [68, 265, 140, 39, 44], 
    [69, 305, 140, 44, 44], 
    [70, 350, 140, 44, 44], 
    [71, 395, 140, 44, 44], 
    [72, 440, 140, 44, 44], 
    [73, 485, 140, 44, 44], 
    [74, 530, 140, 44, 44], 
    [76, 575, 140, 99, 44], // enter

    [80, 830, 140, 44, 44], // 4
    [81, 875, 140, 44, 44], // 5
    [82, 920, 140, 44, 44], // 6

    [84, 0, 185, 104, 44], // shift
    [86, 105, 185, 44, 44],
    [87, 150, 185, 44, 44],
    [88, 195, 185, 44, 44],
    [89, 240, 185, 44, 44],
    [90, 285, 185, 44, 44],
    [91, 330, 185, 44, 44],
    [92, 370, 185, 39, 44],
    [93, 415, 185, 44, 44],
    [94, 460, 185, 44, 44],
    [95, 505, 185, 44, 44],
    [97, 550, 185, 124, 44], // Rshift

    [99, 730, 185, 44, 44], // up

    [101, 830, 185, 44, 44], // 1
    [102, 875, 185, 44, 44], // 2
    [103, 920, 185, 44, 44], // 3

    [104, 965, 185, 44, 94], // numpdEnter

    [105, 0, 230, 59, 50], // ctrl
    [106, 60, 230, 59, 50], // win
    [107, 120, 230, 54, 50], // alt
    [108, 175, 230, 274, 50], // space
    [109, 450, 230, 54, 50], // ralt
    [110, 505, 230, 54, 50], // fn
    [111, 560, 230, 54, 50], // ?
    [113, 615, 230, 59, 50], // rctrl

    [119, 685, 230, 44, 50], // left
    [120, 730, 230, 44, 50], // down
    [121, 775, 230, 44, 50], // right

    [123, 830, 230, 90, 50], // 0
    [124, 920, 230, 44, 50] // del
]


let colerMode = 0 //0 for frequency 1 for average
let drawing = false; // if the user is currently drawing on the canvas

// contains each keys color and index for submitting to the backend
const ledColors = []; // ledIndex: red: green: blue:

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = sizeSlider.value;
    ctx.lineCap = "round";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// stop drawing via releasing click or leaving the canvas
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleGuide() {
    guide.style.display = (guide.style.display === 'none') ? 'block' : 'none';
}

function setColorMode(mode) {
    colerMode = mode;
}

// calculates each keys color and then sends the data to the backend
function submitColors() { 
    ledColors.length = 0; //clear previous

    keyLayout.forEach(([ keyId, x, y, width, height]) => {
        //get image data for the area
        const imgData = ctx.getImageData(x, y, width, height);
        const data = imgData.data; // r g b a r g b a etc

        if (!colerMode) { // get colors by frequency
            const frequencies = new Map();

            for (let i = 0; i < data.length; i+=4) {

                const r = data [i];
                const g = data [i + 1];
                const b = data [i + 2];

                const key = `${r},${g},${b}`;

                frequencies.set(key, (frequencies.get(key) || 0) + 1);
            }

            let maxFreq = 0;
            let mostFrequentColor = null;

            for (const [color, freq] of frequencies.entries()) {
                if (freq > maxFreq) {
                    maxFreq = freq;
                    mostFrequentColor = color;
                }
            }

            if (mostFrequentColor) {
                const [red, green, blue] = mostFrequentColor.split(',').map(Number);
                ledColors.push({ keyId, red, green, blue});
            } else {
                ledColors.push({ keyId, red: 0, green: 0, blue: 0});
            }

        } else { // average colors

            let rSum = 0, gSum = 0, bSum = 0, count = 0;

            for (let i = 0; i < data.length; i += 4) {

                rSum += data[i];
                gSum += data[i + 1];
                bSum += data[i + 2];
                count++;
            }

            if (count === 0) count = 1; // avoid div by zero

            const avgR = Math.round(rSum / count);
            const avgG = Math.round(gSum / count);
            const avgB = Math.round(bSum / count);

            ledColors.push({ keyId, red: avgR, green: avgG, blue: avgB });
        }
    });

    void fetch("/api/colors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ledColors)
    });
}

console.log(ledColors);