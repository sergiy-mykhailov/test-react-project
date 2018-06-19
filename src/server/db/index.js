
import mongoose from 'mongoose';
// import '../models/Note.js';
import { DB } from '../constants';

// const Note = mongoose.model('Note');

mongoose.Promise = global.Promise;

export function setUpConnection() {
    return mongoose.connect(
        `mongodb://${DB.host}:${DB.port}/${DB.name}`,
        {
            useMongoClient: true,
            /* other options */
        }
    );
}

export function getCatalogList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('db - getCatalogList');

            const data = [
                {
                    name: 'Fruits',
                    data: [
                        { item: 'Apples', cost: 20 },
                        { item: 'Oranges', cost: 30 },
                    ],
                },
                {
                    name: 'Vegetables',
                    data: [
                        { item: 'Tomatoes', cost: 24 },
                        { item: 'Cucumbers', cost: 16 },
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
