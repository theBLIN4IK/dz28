const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsModel = require('./models/productsModel');

require('dotenv').config();

const port = process.env.PORT || 3005
const app = express();

app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: 'GET, PATCH, POST, DELETE'
    })
);
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);



//получение 
app.get('/getProducts', async (req, res) => {
	try {
	  const products = await productsModel.find()
	  res.send(products)
	  console.log('получены')
	  return(products)
	} catch (err) {
	  console.error('Произошла ошибка', err)
	  res.status(500).send({ error: 'Произошла ошибка при получении продуктов', err })
	}
  })

  app.delete('/deleteProduct', async (req, res) => {
    try {
        const { id } = req.body;
        await productsModel.deleteOne({ _id: id })
        console.log('удален')
    } catch (err) {
        console.error('Произошла ошибка', err)
        res.status(500).send({ error: 'Произошла ошибка при удалении продукта', err })
    }
})

app.post('/addProduct', async (req, res) => {
	try {
	  const { name, surname, email, gender, image } = req.body
	  const newProduct = {
      name,
       surname,
        email,
         gender, 
         image
	  }
	  await productsModel.create(newProduct)
	  res.send({ message: 'успешно' })
    console.log('добавлен')
	} catch (err) {
	  console.error('Произошла ошибка при добавлении', err)
	  res.send({ error: `Произошла ошибка при добавлении: ${err}` })
	}
  })
  
  // app.patch('/updateProduct', async (req, res) => {
  //   try {
  //       const {id, image} = req.body
  //       await productsModel.updateOne({ _id: id}, {$set: {image: image}})
        
  //       console.log('обновлен')
  //       res.send({ message: 'успешно' })
  //   } catch (err) {
  //       console.error('Произошла ошибка', err)
  //   }
  // })
        



app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})