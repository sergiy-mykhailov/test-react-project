
import CatalogListModel from '../models/CatalogListModel';
import { CATALOG_LIST, CATALOG_LIST_CREATE, CATALOG_LIST_ERROR, CATALOG_LIST_FETCHING, CATALOG_LIST_CLEAR } from '../actions/CatalogListActions';

const model = { ...CatalogListModel };

export default function (state = model, action) {
    const { type } = action;

    switch (type) {
        case CATALOG_LIST_FETCHING: {
            return { ...state, isFetching: true, error: null, fetched: false };
        }

        case CATALOG_LIST: {
            const { data} = action;

            return { isFetching: false, error: null, fetched: true, data: data };
        }

        case CATALOG_LIST_CREATE: {
            const { data } = action;

            return { isFetching: false, error: null, fetched: true, data: data, };
        }

        case CATALOG_LIST_ERROR: {
            const { error } = action;

            console.error(`CatalogListReducer([ ${type} ])`, null, { state, action });

            return { ...state, isFetching: false, fetched: false, error };
        }

        case CATALOG_LIST_CLEAR: {
            return { ...model };
        }

        default: return { ...state };
    }
}
