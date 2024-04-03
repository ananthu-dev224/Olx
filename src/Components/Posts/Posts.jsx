import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
  const [posts, setPosts] = useState([])
  const history = useHistory()
  const { firestore, getDocs, collection } = useContext(FirebaseContext)
  const {setPostDetails} = useContext(PostContext)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleView = (post) => {
     try {
      setPostDetails(post)
      history.push('/view-post')
     } catch (error) {
      console.error(error.message)
     }
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {posts.map((post) => (

            <div
              className="card"
              key={post.id}
              onClick={() => handleView(post)}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{post.price}</p>
                <span className="kilometer">{post.name}</span>
                <p className="name">{post.category}</p>
              </div>
              <div className="date">
                <span>{post.createdDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          {posts.map((post) => (

            <div
              className="card"
              key={post.id}
              onClick={() => handleView(post)}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{post.price}</p>
                <span className="kilometer">{post.name}</span>
                <p className="name">{post.category}</p>
              </div>
              <div className="date">
                <span>{post.createdDate}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Posts;
