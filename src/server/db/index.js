
import mongoose from 'mongoose';
// import CatalogModel from '../models/Catalog';
import { DB } from '../constants';

// const Catalog = mongoose.model('Catalog');

mongoose.Promise = global.Promise;

export function setUpConnection() {
  return mongoose.connect(
    `mongodb://${DB.host}:${DB.port}/${DB.name}`,
    {
      useMongoClient: true,
      /* other options */
    },
  );
}

export function getCatalogList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        {
          id: '1',
          name: 'Fruits',
          data: [
            { key: '0', item: 'Apples', cost: 20 },
            { key: '1', item: 'Oranges', cost: 30 },
          ],
        },
        {
          id: '2',
          name: 'Vegetables',
          data: [
            { key: '0', item: 'Tomatoes', cost: 24 },
            { key: '1', item: 'Cucumbers', cost: 16 },
          ],
        },
      ];

      resolve(data);
    }, 200);
  });
}

// export function getCatalogList() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('db - getCatalogList');
//
//             const data = [
//                 { id: '1', name: 'Fruits' },
//                 { id: '2', name: 'Vegetables' },
//             ];
//
//             resolve(data);
//         }, 200);
//     });
// }

// export function getCatalogById(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('db - getCatalogById');
//
//             const testDB = [
//                 {
//                     catalog: '1',
//                     data: [
//                         { item: 'Apples', cost: 20 },
//                         { item: 'Oranges', cost: 30 },
//                     ],
//                 },
//                 {
//                     catalog: '2',
//                     data: [
//                         { item: 'Tomatoes', cost: 24 },
//                         { item: 'Cucumbers', cost: 16 },
//                     ],
//                 },
//             ];
//
//             const catalog = testDB.find((item) => item.catalog === id);
//
//             if (catalog && catalog.data) {
//                 resolve(catalog.data);
//             } else {
//                 reject({ message: 'Data not found!' });
//             }
//
//         }, 200);
//     });
// }
