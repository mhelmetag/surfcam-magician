// A class with a few helpers to take a spotId and end up with an array of streamUrls
// through the region overview service
class RegionOverviewHelper {
  // Takes 584204204e65fad6a77096b1
  // and returns https://services.surfline.com/kbyg/regions/overview?spotId=584204204e65fad6a77096b1
  generateSpotOverviewUrl(spotId) {
    return `https://services.surfline.com/kbyg/regions/overview?spotId=${spotId}`;
  }

  generateRegionOverviewUrl(regionId) {
    return `https://services.surfline.com/kbyg/regions/overview?subregionId=${regionId}`;
  }

  // To return a region overview
  async fetchRegionOverview(spotOverviewUrl) {
    return fetch(spotOverviewUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(
          `Unexpected response while fetching region overview! HTTP status was ${response.status}`
        );
      })
      .then(data => data)
      .catch(error => {
        throw Error(error.message);
      });
  }

  // To return a single spot
  findSpot(regionOverview, spotId) {
    const matchingSpots = regionOverview.data.spots.filter(spot => {
      return spot._id === spotId;
    });

    return matchingSpots[0];
  }

  // To end up with this [https://cams.cdn-surfline.com/wsc-west/wc-venturapointcam.stream/playlist.m3u8]
  parseStreamUrls(regionOverview) {
    return regionOverview.cameras.map(camera => camera.streamUrl);
  }

  processRegionOverview(regionOverview) {
    return regionOverview.data.spots.map(spot => {
      return {
        name: spot.name,
        id: spot._id,
        hasCameras: spot.cameras.length >= 1
      };
    });
  }
}

export default RegionOverviewHelper;
