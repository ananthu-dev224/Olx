import React, { useContext, useState, useEffect } from 'react';

import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

import './View.css';


function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firestore, collection, query, where, getDocs } = useContext(FirebaseContext)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const {userId} = postDetails
        const userRef = collection(firestore,'users')
        const q = query(userRef,where('id' ,'==', userId));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
           setUserDetails(doc.data())
        })
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPost();
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>Type : {postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        {userDetails && 
        <div className="contactDetails">
        <p className='seller'>Seller details</p>
        <p>{userDetails.username}</p>
        <p>{userDetails.phone}</p>
      </div>
        }
      </div>
    </div>
  );
}
export default View;
