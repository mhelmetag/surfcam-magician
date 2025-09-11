const fs = require("node:fs");
const { Buffer } = require("node:buffer");

// It's got ALL spots baby. Store scraped data here
const KBYG_WHOLE_MAP_PATH = "./scripts/kbygWholeMap.json";

// Transform the scraped data and store here
const SPOTS_PATH = "./src/spots.json";

// I think this will get ALL spots. I was able to do it in one request manually
// from the browser, but may be worth splitting up into many to not be so
// obvious.
const WORLD_QUERIES = [
  "https://services.surfline.com/kbyg/mapview?south=0&west=0&north=180&east=180",
  "https://services.surfline.com/kbyg/mapview?south=-179&west=-179&north=0&east=0",
];

async function getStreamUrls() {
  // Could have an option to either fetch fresh data from surfline or just use
  // the last fetched data. Here we're just using the last manually fetched
  // data.
  const strData = fs.readFileSync(KBYG_WHOLE_MAP_PATH);
  const data = JSON.parse(strData);

  const spotsWithCameras = data.data.spots.filter((spot) => {
    return spot.cameras.length > 0;
  });

  const finalSpots = spotsWithCameras.map((spot) => {
    const { _id: spotId, name, cameras } = spot;
    return {
      id: spotId,
      name,
      cameras: cameras.map((camera) => {
        const { streamUrl, host } = camera;
        return { streamUrl, host };
      }),
    };
  });

  const finalSpotsJson = JSON.stringify(finalSpots, null, 2);
  const buf = Buffer.from(finalSpotsJson);
  fs.writeFileSync(SPOTS_PATH, buf);
}

function main() {
  getStreamUrls();
}

main();
