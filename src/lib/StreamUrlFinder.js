// A class with a few helpers to take a spotId and end up with an array of streamUrls
// through the region overview service
class StreamUrlFinder {
  // Takes 584204204e65fad6a77096b1
  // and returns https://services.surfline.com/kbyg/regions/overview?spotId=584204204e65fad6a77096b1
  generateSpotOverviewUrl(spotId) {
    return `https://services.surfline.com/kbyg/regions/overview?spotId=${spotId}`;
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
  parseRegionOverview(regionOverview, spotId) {
    const matchingSpots = regionOverview.data.spots.filter(spot => {
      return spot._id === spotId;
    });

    return matchingSpots[0];
  }

  // To end up with this [https://cams.cdn-surfline.com/wsc-west/wc-venturapointcam.stream/playlist.m3u8]
  parseStreamUrls(regionalOverview) {
    return regionalOverview.cameras.map(camera => camera.streamUrl);
  }
}

export default StreamUrlFinder;
