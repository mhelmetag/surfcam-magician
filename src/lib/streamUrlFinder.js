export default class StreamUrlFinder {
  // Like this https://www.surfline.com/surf-report/ventura-point/584204204e65fad6a77096b1
  static parseSpotId(spotUrl) {
    let url = new URL(spotUrl)
    return url.pathname.split("/")[3]
  }

  // Like this https://services.surfline.com/kbyg/regions/overview?spotId=584204204e65fad6a77096b1
  static generateSpotOverviewUrl(spotId) {
    return `https://services.surfline.com/kbyg/regions/overview?spotId=${spotId}`
  }

  static parseRegionOverview(regionOverview, spotId) {
    let matchingSpots = regionOverview
      .data
      .spots
      .filter(function(spot) {
        return spot._id === spotId
      })

    return matchingSpots[0]
  }

  // To end up with this https://cams.cdn-surfline.com/wsc-west/wc-venturapointcam.stream/playlist.m3u8
  static parseStreamUrl(spotOverview) {
    return spotOverview.cameras[0].streamUrl
  }
}
