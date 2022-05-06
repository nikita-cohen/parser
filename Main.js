const {Worker, workerData} = require("worker_threads");
const schedule = require('node-schedule')

const data = [
    {url : "https://www.manualslib.com/brand/acer/", maxNum : 158, num : 2},
    {url : "https://www.manualslib.com/brand/aeg/", maxNum : 406, num : 3},
    {url : "https://www.manualslib.com/brand/asus/", maxNum : 260, num : 4},
    {url : "https://www.manualslib.com/brand/beko/", maxNum : 186, num : 5},
    {url : "https://www.manualslib.com/brand/black-and-decker/", maxNum : 318, num : 6},
    {url : "https://www.manualslib.com/brand/bosch/", maxNum : 644, num : 7},
    {url : "https://www.manualslib.com/brand/brother/", maxNum : 128, num : 8},
    {url : "https://www.manualslib.com/brand/canon/", maxNum : 196, num : 9},
    {url : "https://www.manualslib.com/brand/casio/", maxNum : 180, num : 10},
    {url : "https://www.manualslib.com/brand/cisco/", maxNum : 220, num : 11},
    {url : "https://www.manualslib.com/brand/craftsman/", maxNum : 236, num : 12},
    {url : "https://www.manualslib.com/brand/d-link/", maxNum : 218, num : 13},
    {url : "https://www.manualslib.com/brand/dell/", maxNum : 210, num : 14},
    {url : "https://www.manualslib.com/brand/electrolux/", maxNum : 238, num : 15},
    {url : "https://www.manualslib.com/brand/emerson/", maxNum : 410, num : 16},
    {url : "https://www.manualslib.com/brand/epson/", maxNum : 240, num : 17},
    {url : "https://www.manualslib.com/brand/frigidaire/", maxNum : 112, num : 18},
    {url : "https://www.manualslib.com/brand/fujitsu/", maxNum : 258, num : 19},
    {url : "https://www.manualslib.com/brand/ge/", maxNum : 542, num : 20},
    {url : "https://www.manualslib.com/brand/haier/", maxNum : 196, num : 21},
    {url : "https://www.manualslib.com/brand/hitachi/", maxNum : 474, num : 22},
    {url : "https://www.manualslib.com/brand/honda/", maxNum : 154, num : 23},
    {url : "https://www.manualslib.com/brand/honeywell/", maxNum : 480, num : 24},
    {url : "https://www.manualslib.com/brand/hp/", maxNum : 380, num : 25},
    {url : "https://www.manualslib.com/brand/husqvarna/", maxNum : 188, num : 26},
    {url : "https://www.manualslib.com/brand/jvc/", maxNum : 324, num : 27},
    {url : "https://www.manualslib.com/brand/kenmore/", maxNum : 160, num : 28},
    {url : "https://www.manualslib.com/brand/kenwood/", maxNum : 348, num : 29},
    {url : "https://www.manualslib.com/brand/kitchenaid/", maxNum : 132, num : 30},
    {url : "https://www.manualslib.com/brand/lenovo/", maxNum : 210, num : 31},
    {url : "https://www.manualslib.com/brand/lg/", maxNum : 538, num : 32},
    {url : "https://www.manualslib.com/brand/makita/", maxNum : 276, num : 33},
    {url : "https://www.manualslib.com/brand/miele/", maxNum : 158, num : 34},
    {url : "https://www.manualslib.com/brand/mitsubishi-electric/", maxNum : 266, num : 35},
    {url : "https://www.manualslib.com/brand/motorola/", maxNum : 338, num : 36},
    {url : "https://www.manualslib.com/brand/nec/", maxNum : 302, num : 37},
    {url : "https://www.manualslib.com/brand/nokia/", maxNum : 174, num : 38},
    {url : "https://www.manualslib.com/brand/panasonic/", maxNum : 860, num : 39},
    {url :"https://www.manualslib.com/brand/philips/", maxNum : 856, num : 40},
    {url :"https://www.manualslib.com/brand/pioneer/", maxNum : 322, num : 41},
    {url :"https://www.manualslib.com/brand/rca/", maxNum : 302, num : 42},
    {url :"https://www.manualslib.com/brand/samsung/", maxNum : 610, num : 43},
    {url :"https://www.manualslib.com/brand/sanyo/", maxNum : 328, num : 44},
    {url :"https://www.manualslib.com/brand/sharp/", maxNum : 422, num : 45},
    {url :"https://www.manualslib.com/brand/siemens/", maxNum : 516, num : 46},
    {url :"https://www.manualslib.com/brand/silvercrest/", maxNum : 390, num : 47},
    {url :"https://www.manualslib.com/brand/sony/", maxNum : 572, num : 48},
    {url :"https://www.manualslib.com/brand/toro/", maxNum : 204, num : 49},
    {url :"https://www.manualslib.com/brand/toshiba/", maxNum : 424, num : 50},
    {url :"https://www.manualslib.com/brand/whirlpool/", maxNum : 158, num : 51}
]

async function runWorker() {
    console.log("ok")
   const result = await Promise.all(data.map((obj, index) => {
        new Promise((resolve, reject) =>  {
            const worker = new Worker('./workerThread', {
                workerData : obj
            })

            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error("something go wrong"));
            })
        })
    }))

}

function resetAtMidnight() {
    let now = new Date();
    let night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );

    let msToMidnight = night.getTime() - now.getTime();

    console.log(msToMidnight)
    setTimeout(function() {
        runWorker().then();              //      <-- This is the function being called at midnight.
        resetAtMidnight();    //      Then, reset again next midnight.
    }, msToMidnight);
}

resetAtMidnight();

