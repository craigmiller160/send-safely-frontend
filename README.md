# Send Safely Frontend Assessment

This is the frontend coding assessment for Craig Miller's interview with Send Safely.

## A Note About Bundle Size

To accomplish secure communication with the SendSafely REST API, it appears I need to provide a HMAC-SHA-256 encrypted payload to validate my identity. I am doing this using the `crypto-js` library which is being pulled into my final client bundle. Given the sheer size of this library, in a non-exercise world I would instead seek to have a server-side piece of logic for handling all encryption because this is something that, if possible, should be avoided in a frontend bundle due to its performance impact.

## A Note About Local Storage

Normally I would NEVER store authentication values in local storage. However, if a particular environment variable is set at startup, then the authentication values are indeed placed into local storage. This was to better support iterative development because I just didn't want to have to keep entering my username/password over and over again.

## Dummy Data

To help with validating the pagination requirement of the exercise, I have built in a dummy data mode. Once authenticated, there will be a switch in the top right corner of the UI to enable it. This guarantees the presence of enough data to validate the scrolling pagination.

When dummy data is not enabled, of course, the app will query the SendSafely API.