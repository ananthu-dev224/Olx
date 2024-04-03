import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { FirebaseContext, AuthContext } from '../../store/Context';

import './Create.css';
import Header from '../Header/Header';
import { firestore } from '../../firebase/config';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [img, setImg] = useState('')
  const [err, setErr] = useState('')
  const [load,setLoad] = useState('')

  const history = useHistory()

  const { storage , fireStore} = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const handleUpload = (e) => {
    e.preventDefault()
    try {
      
      if(!user){
        return setErr('Please Log in to Sell Products')
      }


      if (name.trim() === '' || category.trim() === '' || price.trim() === '' || img === '') {
        return setErr('Please fill out the fields')
      } else if (price <= 0) {
        return setErr('Price cannot be 0 or less than 0')
      }
      setLoad('Uploading product...')
      const storageRef = storage.ref(`images/${img.name}`)
      storageRef.put(img).then((snapShot) => {
                storageRef.getDownloadURL().then((url) =>{
                     firestore.collection('products').add({
                        name:name,
                        category:category,
                        price:price,
                        url:url,
                        userId:user.uid,
                        createdDate: new Date().toDateString()
                     }).then(() => {
                      setLoad('')
                         history.push('/')
                     })
                })
      })
    } catch (error) {
      setLoad('')
      alert("An error occured, please try again")
      console.error(error.message)
    }
  }

  if (err) {
    setTimeout(() => {
      setErr('')
    }, 3000);
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
            <h4>Sell a Product</h4>
            <div className='error'><span>{err}</span></div>
          </div>
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e) => setName(e.target.value)}

            />
            <br />
            <label htmlFor="fcat">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fcat"
              name="category"
              onChange={(e) => setCategory(e.target.value)}

            />
            <br />
            <label htmlFor="fprice">Price</label>
            <br />
            <input className="input" type="number" id="fprice" name="Price" onChange={(e) => setPrice(e.target.value)} />
            <br />


            <br />
            <img alt="Posts" width="200px" height="200px" src={img ? URL.createObjectURL(img) : 'https://via.placeholder.com/100'} ></img>


            <br />
            <br />
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={(e) => handleUpload(e)}>{load ? load : 'Upload and Submit'}</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
