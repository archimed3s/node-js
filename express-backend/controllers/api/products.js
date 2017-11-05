import { Router } from "express";
import { Product, products } from '../../models/product';

export const router = Router();

router.get('/', (req, res) => {
  res.send(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const [ product ] = products.filter(product => product.id == id);

  if(product) {
    res.send(product);
    return;
  }

  res.status(404)
    .send('Not found');
});

router.get('/:id/reviews', (req, res) => {
  const { id } = req.params;
  const [ product ] = products.filter(product => product.id == id);

  res.send(product && product.reviews || []);
});

router.post('/', (req, res) => {
  products.push({ ...req.body, id: products.length });

  res.send(products);
});