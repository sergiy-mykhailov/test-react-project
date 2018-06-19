
import CatalogModel from '../models/CatalogModel';
import { CATALOG, CATALOG_CREATE, CATALOG_ERROR, CATALOG_FETCHING, CATALOG_CLEAR } from '../actions/CatalogActions';

const model = { ...CatalogModel };

export default function (state = model, action) {
    const { type } = action;

    switch (type) {
        case CATALOG_FETCHING: {
            return { ...state, isFetching: true, error: null, fetched: false };
        }

        case CATALOG: {
            const { data} = action;

            return { isFetching: false, error: null, fetched: true, data: data };
        }

        case CATALOG_CREATE: {
            const { data } = action;

            return { isFetching: false, error: null, fetched: true, data: data, };
        }

        case CATALOG_ERROR: {
            const { error } = action;

            console.error(`CatalogReducer([ ${type} ])`, null, { state, action });

            return { ...state, isFetching: false, fetched: false, error };
        }

        case CATALOG_CLEAR: {
            return { ...model };
        }

        default: return { ...state };
    }
}
