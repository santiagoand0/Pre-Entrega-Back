const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi aplicación Express' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
