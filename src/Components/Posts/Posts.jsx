import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { ShimmerSimpleGallery } from 'react-shimmer-effects';

import { query, where, doc, updateDoc, arrayUnion, arrayRemove } from '../../firebase/config'

import Heart from '../../assets/Heart';
import FilledHeart from '../../assets/FilledHeart';
import './Post.css';

function Posts() {
  const [posts, setPosts] = useState([])
  const [fav, setFav] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { firestore, getDocs, collection } = useContext(FirebaseContext)
  const { setPostDetails } = useContext(PostContext)

  const { user } = useContext(AuthContext)


  useEffect(() => {
    const fetchPosts =  () => {
      try {
        setTimeout(async () => {
          const querySnapshot = await getDocs(collection(firestore, 'products'));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setPosts(data);

          if (user) {
            const userId = user.uid;
            const userRef = collection(firestore, 'users');
            const q = query(userRef, where('id', '==', userId));
            const userSnapshot = await getDocs(q);
            userSnapshot.forEach((doc) => {
              setFav(doc.data().favorites || []);
            });
          }
          setLoading(false)
        }, 2000);
      } catch (error) {
        setLoading(false)
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [firestore, user]);

  const handleView = (post) => {
    try {
      setPostDetails(post);
      history.push('/view-post');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddToFav = async (postId) => {
    if (!user) {
      return toast.info('Log in to add to favorites!');
    }
    const userId = user.uid;
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('id', '==', userId));
    const querySnapshot = await getDocs(q);

    try {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(firestore, 'users', userDoc.id);

      await updateDoc(userDocRef, {
        favorites: arrayUnion(postId)
      });

      setFav((prevFav) => [...prevFav, postId]);
      toast.success('Added to favorites')
      history.push('/favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleRemoveFav = async (postId) => {
    const userId = user.uid;
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('id', '==', userId));
    const querySnapshot = await getDocs(q);

    try {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(firestore, 'users', userDoc.id);

      await updateDoc(userDocRef, {
        favorites: arrayRemove(postId)
      });
      setFav((prevFav) => prevFav.filter(favId => favId !== postId));
      toast.success('Removed from favorites')
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <div className="postParentDiv">
      {loading ? (
        <div className='moreView'>
          <div className="cards">
            <ShimmerSimpleGallery card imageHeight={200} caption />
          </div>
        </div>
      ) : (
        <>
          <div className="moreView">
            <div className="heading">
              <span>Quick Menu</span>
              <span>View more</span>
            </div>
            <div className="cards">
              {posts.map(post => {
                const isFavorite = fav.some(favItem => favItem === post.id);
                return (
                  <div className="card" key={post.id}>
                    <div className="favorite" onClick={() => {
                      if (isFavorite) {
                        handleRemoveFav(post.id);
                      } else {
                        handleAddToFav(post.id);
                      }
                    }}>
                      {isFavorite ? <FilledHeart /> : <Heart />}
                    </div>
                    <div className="image" onClick={() => handleView(post)}>
                      <img src={post.url} alt={post.name} />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9;{post.price}</p>
                      <span className="kilometer" onClick={() => handleView(post)}>{post.name}</span>
                      <p className="name">{post.category}</p>
                    </div>
                    <div className="date">
                      <span>{post.createdDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="recommendations">
            <div className="heading">
              <span>Fresh recommendations</span>
            </div>
            <div className="cards">
              {posts.map(post => {
                const isFavorite = fav.some(favItem => favItem === post.id);
                return (
                  <div className="card" key={post.id}>
                    <div className="favorite" onClick={() => {
                      if (isFavorite) {
                        handleRemoveFav(post.id);
                      } else {
                        handleAddToFav(post.id);
                      }
                    }}>
                      {isFavorite ? <FilledHeart /> : <Heart />}
                    </div>
                    <div className="image" onClick={() => handleView(post)}>
                      <img src={post.url} alt={post.name} />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9;{post.price}</p>
                      <span className="kilometer" onClick={() => handleView(post)}>{post.name}</span>
                      <p className="name">{post.category}</p>
                    </div>
                    <div className="date">
                      <span>{post.createdDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;
