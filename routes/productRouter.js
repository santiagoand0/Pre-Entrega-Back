const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function leerProductos() {
    try {
      let data = fs.readFileSync(path.join(__dirname, 'productos.json'), 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

     router.get('/', (req, res) => {
        let productos = leerProductos();
        const limit = req.query.limit;
        res.json(limit ? productos.slice(0, limit) : productos);
      });
 
      router.get('/:pid', (req, res) => {
        let productos = leerProductos();
        let producto = productos.find(p => p.id == req.params.pid);
        if (producto) {
          res.json(producto);
        } else {
          res.status(404).send('Producto no encontrado');
        }
      });
 
      router.post('/', (req, res) => {
        let productos = leerProductos();
        let nuevoProducto = {
          id: Date.now(),
          ...req.body
        };
        productos.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname, 'productos.json'), JSON.stringify(productos));
        res.status(201).json(nuevoProducto);
      });
 
      router.put('/:pid', (req, res) => {
        let productos = leerProductos();
        let index = productos.findIndex(p => p.id == req.params.pid);
        if (index !== -1) {
          productos[index] = { ...productos[index], ...req.body };
          fs.writeFileSync(path.join(__dirname, 'productos.json'), JSON.stringify(productos));
          res.json(productos[index]);
        } else {
          res.status(404).send('Producto no encontrado');
        }
      });

      router.delete('/:pid', (req, res) => {
        let productos = leerProductos();
        productos = productos.filter(p => p.id != req.params.pid);
        fs.writeFileSync(path.join(__dirname, 'productos.json'), JSON.stringify(productos));
        res.status(204).send();
      });

 
module.exports = router;