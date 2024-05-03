import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './List.module.css';
import delData from '../../utils/delData.js';
import { v4 as uuid } from 'uuid';
import postData from '../../utils/addData.js';
import getData from '../../utils/getData.js';

// import fetchData from '../../utils/fetchData.js'


// const handleFileChange = (async (e) => {
//     const selectedFile = e.target.files[0]

//     const response = await fetchData('http://localhost:3005/updateProduct', {
//         method: 'PATCH',
//         body: selectedFile,

//     });
//     const data = await response.json()
//     alert(data.message)
   
// })


const List = () => {
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getData('http://localhost:3005/getProducts')
    setListItems(data);
  }

  const addItem = async () => {
    const product = {
      name: prompt('Enter name'),
      surname: prompt('Enter surname'),
      email: prompt('Enter email'),
      gender: prompt('Enter gender'),
      image: prompt('Enter image'),
    };

    await postData('http://localhost:3005/addProduct', product)
    fetchData()
  };

  const updateList = async () => {
    fetchData()
  };

  return (
    <div className={cn(styles['container'])}>
      <button className={cn(styles['add'])} onClick={addItem}>
        Add Item
      </button>
      <button className={cn(styles['add'])} onClick={updateList}>
        Update
      </button>
      <ul className={cn(styles['list'])}>
        {listItems.map((item) => (
          <li className={cn(styles['list-item'])} key={uuid()}>
            <img
              className={cn(styles['pic'])}
              src={item.image}
              style={{ width: '100px', height: '100px', border: '3px solid white' }}
              alt="img"
            />
            <div className={cn(styles['list-item-content'])}>
              <p className={cn(styles['text'])}>
                имя:{item.name} фамилия:{item.surname}
              </p>
              <p className={cn(styles['text'])}>id:{item._id}</p>
              <p className={cn(styles['text'])}>гендер:{item.gender}</p>
              <p className={cn(styles['text'])}>email:{item.email}</p>
              <button
                className={cn(styles['delbtn'])}
                onClick={async () => await delData('http://localhost:3005/deleteProduct', item._id)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List