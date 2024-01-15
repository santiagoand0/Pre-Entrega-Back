const express = require('express');
const router = express.Router();

  router.post('/', (req, res) => {
    let carritos = leerCarritos();
    let nuevoCarrito = {
      id: Date.now(), 
      productos: []
    };
    carritos.push(nuevoCarrito);
    fs.writeFileSync(path.join(__dirname, 'carritos.json'), JSON.stringify(carritos));
    res.status(201).json(nuevoCarrito);
  });

  router.get('/:cid', (req, res) => {
    let carritos = leerCarritos();
    let carrito = carritos.find(c => c.id == req.params.cid);
    if (carrito) {
      res.json(carrito.productos);
    } else {
      res.status(404).send('Carrito no encontrado');
    }
  });

  router.post('/:cid/product/:pid', (req, res) => {
    let carritos = leerCarritos();
    let carrito = carritos.find(c => c.id == req.params.cid);
    if (carrito) {
      let producto = carrito.productos.find(p => p.product == req.params.pid);
      if (producto) {
        producto.quantity += 1; 
      } else {
        carrito.productos.push({ product: req.params.pid, quantity: 1 }); 
      }
      fs.writeFileSync(path.join(__dirname, 'carritos.json'), JSON.stringify(carritos));
      res.json(carrito);
    } else {
      res.status(404).send('Carrito no encontrado');
    }
  });

  module.exports = router;