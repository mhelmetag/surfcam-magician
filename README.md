# Surfcam Magician

Watch HD surfcams for free and forever with no ads!

## More Info

Surfline's surfcams are either HD (premium only) or separated by ads (about 30 seconds of video per ad).

However, using their region overview API ([https://services.surfline.com/kbyg/regions/overview]()), the surfcams' stream URLs can be found. With those stream URLs, the streams can be directly tapped (without the need for premium or ads).

This app demonstrates how to translate a Surfline spot URL into the spot's surfcam stream URL and play that stream using an open source video player (Surfline uses JW Player; a proprietary video player).

## How to Deploy

The static site is hosted on AWS via CloudFront.

There's a script that automates most of the build/deploy process using `react-scipts` and `aws`:

```sh
$ yarn release
```

Which clears the S3 bucket (you could use versioning instead), syncs the build to S3, and invalidates the files in CloudFront.

## How to Run Locally

Just like any create react app like app, just use:

```sh
$ yarn start
```
