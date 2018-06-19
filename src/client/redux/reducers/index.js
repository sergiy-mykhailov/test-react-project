
import { combineReducers } from 'redux';

import CatalogListStore from './CatalogListReducer';

export default combineReducers({
    CatalogListStore,
});

// const allReducers = {
//     NewsStore,
// };
//
// const combinedReducer = combineReducers({
//     ...allReducers,
// });
//
// export const reducers = allReducers;
//
// export const rootReducer = () => {
//     return combinedReducer;
// };