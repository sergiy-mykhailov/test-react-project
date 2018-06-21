
import clone from 'lodash/clone';
import CatalogListModel from '../models/CatalogListModel';
import {
  CATALOG_LIST, CATALOG_LIST_CREATE, CATALOG_LIST_ERROR, CATALOG_LIST_FETCHING, CATALOG_LIST_CLEAR, CATALOG_LIST_UPDATE,
  PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_DELETE,
} from '../actions/CatalogListActions';

const model = { ...CatalogListModel };

export default function (state = model, action) {
  const { type } = action;

  switch (type) {
    case CATALOG_LIST_FETCHING: {
      return { ...state, isFetching: true, error: null, fetched: false };
    }

    case CATALOG_LIST: {
      const { data } = action;

      return { isFetching: false, error: null, fetched: true, data };
    }

    case CATALOG_LIST_CREATE: {
      const { catalog } = action;

      const newData = clone(state.data);
      newData.push(catalog);

      return { ...state, data: newData };
    }

    case CATALOG_LIST_ERROR: {
      const { error } = action;
      console.error(`CatalogListReducer([ ${type} ])`, null, { state, action });

      return { ...state, isFetching: false, fetched: false, error };
    }

    case CATALOG_LIST_CLEAR: {
      return { ...model };
    }

    case CATALOG_LIST_UPDATE: {
      const { catalogId, data } = action;

      const newData = clone(state.data);
      const catalog = newData.find(item => item.id === catalogId);
      if (catalog) {
        catalog.data = clone(data);
      }

      return { ...state, data: newData };
    }

    case PRODUCT_CREATE: {
      const { catalogId, product } = action;

      const newData = clone(state.data);
      const catalog = newData.find(item => item.id === catalogId);
      if (catalog) {
        catalog.data.push(product);
      }

      return { ...state, data: newData };
    }

    case PRODUCT_UPDATE: {
      const { catalogId, key, columnName, value } = action;

      const newData = clone(state.data);
      const catalog = newData.find(item => item.id === catalogId);

      if (catalog) {
        const product = catalog.data.find(item => item.key === key);

        if (product) {
          product[columnName] = value;
        }
      }

      return { ...state, data: newData };
    }

    case PRODUCT_DELETE: {
      const { catalogId, key } = action;

      const newData = clone(state.data);
      const catalog = newData.find(item => item.id === catalogId);
      if (catalog) {
        const productIndex = catalog.data.findIndex(item => item.key === key);
        if (productIndex !== -1) {
          catalog.data.splice(productIndex, 1);
        }
      }

      return { ...state, data: newData };
    }

    default: return { ...state };
  }
}
