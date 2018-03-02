# async-action-middleware

async-action-middleware is a simple redux middleware for handling common async workflows in redux applications.

### installation

clone the repo and install via the instructions for installing a redux middleware.

### example

```js
const asyncAction = {
    async: true,
    args: [3, 2, 1],
    method: httpService.fetch,
    type: 'HTTP/FETCH_SOMETHING'
}
```

dispatch an action with the async flag set to true. method should be a method that returns a promise. Before the service method provided is called an action will be passed with `/PENDING` appended to the end.

example: `HTTP/FETCH_SOMETHING/PENDING`

On success an action will be returned with the following format:

```js
{
    type: 'HTTP/FETCH_SOMETHING/SUCCESS', payload: result,
    meta: action
}
```

payload will be the eventual resolve value of the promise that was passed as the original method.
meta will contain the original action that was dispatched in case information about it is needed.

On error an action will be returned with the following format:

```js
{
    type: 'HTTP/FETCH_SOMETHING/ERROR',
    payload: errorResult,
    error: true,
    meta: action
}
```

The error flag will be set to true, indicating that an error is present. The payload will be the error that the promise catch block resolves to and again meta will contain the original action.

😀