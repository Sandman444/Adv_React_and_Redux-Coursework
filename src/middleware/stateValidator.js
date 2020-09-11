import stateSchema from './stateSchema.js';
import tv4 from 'tv4';

export default ({ dispatch, getState }) => next => action => {
  //apply all other middleware before validating
  next(action);

  if (!tv4.validate(getState(), stateSchema)) {
    console.warn('Invalid state schema detected');
  }
};
