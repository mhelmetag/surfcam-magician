class StreamUrlFinder {
  
  async fetchStreamUrl(spotId) {
    const spotOverviewUrl = this.generateSpotOverviewUrl(spotId);
    const regionOverview = await this.fetchRegionOverview(spotOverviewUrl);
    const spotInfo = this.parseRegionOverview(regionOverview, spotId);
    const streamUrl = this.parseStreamUrl(spotInfo);

    return streamUrl;
  }

  // Like this https://www.surfline.com/surf-report/ventura-point/584204204e65fad6a77096b1
  parseSpotId(spotUrl) {
    const url = new URL(spotUrl);
    return url.pathname.split("/")[3];
  }

  // Like this https://services.surfline.com/kbyg/regions/overview?spotId=584204204e65fad6a77096b1
  generateSpotOverviewUrl(spotId) {
    return `https://services.surfline.com/kbyg/regions/overview?spotId=${spotId}`;
  }

  async fetchRegionOverview(spotOverviewUrl) {
    return fetch(spotOverviewUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(
          `Unexpected response while fetching region overview! HTTP status was ${
            response.status
          }`
        );
      })
      .then(data => data)
      .catch(error => {
        throw Error(error.message);
      });
  }

  parseRegionOverview(regionOverview, spotId) {
    const matchingSpots = regionOverview.data.spots.filter(spot => {
      return spot._id === spotId;
    });

    return matchingSpots[0];
  }

  // To end up with this https://cams.cdn-surfline.com/wsc-west/wc-venturapointcam.stream/playlist.m3u8
  parseStreamUrl(spotInfo) {
    return spotInfo.cameras[0].streamUrl;
  }
}

export default StreamUrlFinder;
