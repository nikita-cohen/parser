const pt = require("puppeteer");
const axios = require("axios");
const {Worker, parentPort, workerData} = require("worker_threads");

const data = workerData;

async function parseData(url, maxNum, num) {
    const obj = {};
    const browser = await pt.launch();
    const page = await browser.newPage();

    const newUrl = url;
    const newMaxNum = maxNum;

    let count = 3;

    while (count < newMaxNum) {
        try {
            await page.goto("https://www.manualslib.com/brand", {timeout: 0});


            const brand = await page.evaluate((num) => {
                return Array.from(document.querySelectorAll(`#wrap > div > section > div:nth-child(${num.toString()}) > div.col-xs-3.col-sm-2.col1 > a`))
                    .map(x => x.textContent);
            }, num)

            obj.brand = brand[0];

            await page.goto(newUrl, {timeout: 0});

            const category = await page.evaluate((count) => {
                return Array.from(document.querySelectorAll(`#wrap > div > div:nth-child(${count.toString()}) > a`))
                    .map(x => x.textContent);
            }, count)

            obj.category = category[0];

            console.log(category[0]);

            const categoryForUrl = category[0].replace(/ /g, "-").toLowerCase() + ".html";

            await page.goto(newUrl + categoryForUrl, {timeout: 0})

            const url = await page.evaluate(() => {
                const oldArray = Array.from(document.querySelectorAll('.col-sm-2.mname > a'));
                const newArray = [];
                oldArray.forEach(x => {
                    newArray.push({href: x.href, name: x.textContent});
                })
                return newArray;
            })

            url.forEach((u, index) => {
                obj.url = u.href;
                obj.title = brand[0] + " " + u.name + " " + category[0] + " manual";

                 //console.log(obj)
                 axios.post("https://search.findmanual.guru/manual/", obj)
                     .then(data => console.log("ok " + index))
                     .catch(e => console.log(e));
            })

            count = count + 2;
        } catch (e) {
            console.log(e)
        }
    }

    await browser.close();

}

parseData(data.url, data.maxNum, data.num).then();
