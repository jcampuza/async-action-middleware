import {
    createSuccessAction,
    createPendingAction,
    createErrorAction,
} from './util';

/**
 * Typical async action to be dispatched as follows:
 *
 * const asyncAction = {
 *   async: true,
 *   args: [3, 2, 1],
 *   method: httpService.fetch,
 *   type: 'HTTP/FETCH_SOMETHING'
 *   meta: metaObject
 * }
 *
 * async must be true, args can be an array of args to call method with
 * type will be suffixed with /PENDING, /SUCCESS, /ERROR
 *
 * when the method resolves, a success action will be called with the original action
 * as part of the meta object in case that's needed or a failure action will be dispatched
 * in the same manner
 **/
const asyncActionMiddleware = store => next => action => {
    if (!action.async) {
        return next(action);
    }

    // Generate action types
    const progressActionType = createPendingAction(action.name);
    const successActionType = createSuccessAction(action.name);
    const errorActionType = createErrorAction(action.name);

    // get method to call and args
    const promise = action.promise;
    const args = action.args;

    store.dispatch({ type: progressActionType });
    promise(...args)
    .then((result) => {
        store.dispatch({ type: successActionType, payload: result, meta: action });
    })
    .catch((err) => {
        store.dispatch({ type: errorActionType, payload: err, meta: action, error: true });
    });
}

export asyncActionMiddleware;
