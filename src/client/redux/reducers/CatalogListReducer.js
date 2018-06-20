
import clone from 'lodash/clone';
import CatalogListModel from '../models/CatalogListModel';
import {
    CATALOG_LIST, CATALOG_LIST_CREATE, CATALOG_LIST_ERROR, CATALOG_LIST_FETCHING, CATALOG_LIST_CLEAR,
    PRODUCT_CREATE, PRODUCT_UPDATE,
} from '../actions/CatalogListActions';

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

        case PRODUCT_CREATE: {
            const { catalogId, product } = action;

            const newData = clone(state.data);
            const catalog = newData.find((item) => item.id === catalogId);
            if (catalog) {
                catalog.data.push(product);
            }

            return { ...state, data: newData, };
        }

        case PRODUCT_UPDATE: {
            const { catalogId, key, columnName, value } = action;

            const newData = clone(state.data);
            const catalog = newData.find((item) => item.id === catalogId);
            // console.log('reducer - catalog', catalog);
            if (catalog) {
                const product = catalog.data.find((item) => item.key === key);
                // console.log('reducer - product', product);
                if (product) {
                    console.log('reducer - value', catalogId, key, columnName, value);
                    product[columnName] = value;
                }
            }

            return { ...state, data: newData, };
        }

        default: return { ...state };
    }
}
