const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middlewares');
const productRepo = require('../../repos/products');
const productNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', async (req, res) => {
  const products = await productRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', (req, res) => {
  res.send(productNewTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productRepo.create({ title, price, image });

    res.redirect('/admin/products');
  });

module.exports = router;
