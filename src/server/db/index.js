
import mongoose from 'mongoose';
import CatalogModel from '../models/Catalog';
import { DB } from '../constants';

mongoose.connect(`mongodb://${DB.host}:${DB.port}/${DB.name}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.info(`Connected database: ${DB.name}`);

  const catalogs = await CatalogModel.find().exec();
  if (catalogs.length === 0) {
    addTestData();
  }
});

export async function addTestData() {
  const fruits = new CatalogModel({
    name: 'Fruits',
    data: [
      { key: '0', item: 'Apples', cost: 20 },
      { key: '1', item: 'Oranges', cost: 30 },
    ],
  });
  const vegetables = new CatalogModel({
    name: 'Vegetables',
    data: [
      { key: '0', item: 'Tomatoes', cost: 24 },
      { key: '1', item: 'Cucumbers', cost: 16 },
    ],
  });

  await fruits.save();
  await vegetables.save();

  console.info('Added test data to database...');
}

export async function getCatalogList() {
  const query = CatalogModel.find();
  const data = await query.exec();

  return data;
}
