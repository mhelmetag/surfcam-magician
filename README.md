# Surfcam Magician

**Note:** Surfline finally started blocking cross origin requests so I've stopped hosting this publicly. It's possible to get around this but I'm going to stop hosting a site that makes direct requests so I don't totally ruin access to their APIs. Feel free to host locally and tinker away!

Watch HD surfcams for free and forever with no ads!

## More Info

Surfline's surfcams are either HD (premium only) or separated by ads (about 30 seconds of video per ad).

However, using their region overview API (<https://services.surfline.com/kbyg/regions/overview?spotId=584204204e65fad6a77096b1>, the surfcams' stream URLs can be found. With those stream URLs, the streams can be directly tapped (without the need for premium or ads).

This app demonstrates how to translate a Surfline spot URL into the spot's surfcam stream URL and play that stream using an open source video player (Surfline uses JW Player; a proprietary video player).

## How to Deploy

The static site is hosted on Netlify and deployed via their CD pipeline.

## How to Run Locally

Like any `create-react-app`-based app, use:

```sh
yarn start
```

## Credits

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/).

Quotes by [Uncle Tito](https://rocketpower.fandom.com/wiki/Tito_Makani).

## Screenshots

![magician-favorites](.github/screenshots/magician-favorites.jpg)

![magician-search-1](.github/screenshots/magician-search-1.jpg)

![magician-search-2](.github/screenshots/magician-search-2.jpg)
