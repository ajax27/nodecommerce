const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products.map(product => {
    return `
    <div>${product.title}</div>
    `
  }).join('')

  return layout({
    title: 'NodeCommerce | Products',
    content: `
      <h1 class="title">Products</h1>
      ${renderedProducts}
    `
  });
};
