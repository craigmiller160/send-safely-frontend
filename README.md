# Send Safely Frontend Assessment

This is the frontend coding assessment for Craig Miller's interview with Send Safely.

## How to Run

Install all dependencies and then use the `start` script via the `package.json`. It will run on port `3003`.

## A Note About Bundle Size

To accomplish secure communication with the SendSafely REST API, it appears I need to provide a HMAC-SHA-256 encrypted payload to validate my identity. I am doing this using the `crypto-js` library which is being pulled into my final client bundle. Given the sheer size of this library, in a non-exercise world I would instead seek to have a server-side piece of logic for handling all encryption because this is something that, if possible, should be avoided in a frontend bundle due to its performance impact.

## A Note About Local Storage

Normally I would NEVER store authentication values in local storage. However, I would also normally handle authentication via a same-site cookie, but this is a demo project. Anyway, to avoid having to login every time the page refreshes, simply add a file called `.env` to the root of the project with the following contents and the authentication details will be saved in localStorage:

```
REACT_APP_LOCAL_STORAGE=true
```

Without this, the authentication details will be wiped every time the browser refreshes.

## Dummy Data

The infinite scroll loading requirement meant having enough data to properly show off this feature. To help with this, I added a Dummy Data mode. When enabled, a local DummyService will provide an infinite amount of package data to scroll through, thus allowing this feature to be demonstrated.

Once authenticated, there will be a switch in the top right corner to enable/disable the Dummy Data mode.