
import mongoose from 'mongoose';

const CatalogSchema = mongoose.Schema({
  name: { type: String },
  data: { type: Array },
});

const CatalogModel = mongoose.model('Catalog', CatalogSchema);

export default CatalogModel;
