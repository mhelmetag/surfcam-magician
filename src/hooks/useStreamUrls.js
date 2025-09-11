import spots from "../spots.json";

export function getStreamUrls(spotId) {
  const spot = spots.find((spot) => {
    return spot.id === spotId;
  });
  const streamUrls = spot.cameras.map((camera) => {
    return camera.streamUrl.replace("https://hls.cdn-surfline.com", "");
  });

  return { streamUrls, spotName: spot.name };
}
