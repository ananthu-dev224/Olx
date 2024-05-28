import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ShimmerSimpleGallery } from 'react-shimmer-effects';
import './Fav.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { query, where, doc, updateDoc, arrayRemove, firestore, collection, getDocs } from '../../firebase/config';
import FilledHeart from '../../assets/FilledHeart';

export const Fav = () => {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const userId = user.uid;
        const userRef = collection(firestore, 'users');
        const q = query(userRef, where('id', '==', userId));
        const userSnapshot = await getDocs(q);
        let favoriteIds = [];

        userSnapshot.forEach((doc) => {
          favoriteIds = doc.data().favorites;
        });

        const postsRef = collection(firestore, 'products');
        const postsQuery = query(postsRef, where('__name__', 'in', favoriteIds));
        const postsSnapshot = await getDocs(postsQuery);
        const favoritePostsData = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFav(favoritePostsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite posts:', error);
        setLoading(false);
      }
    };
    fetchFav();
  }, [user, fav]);

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
      fav.length === 1 ? setFav([]) : setFav((prevFav) => prevFav.filter(favId => favId !== postId));
      toast.success('Removed from favorites')
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const handleView = (post) => {
    try {
      setPostDetails(post)
      history.push('/view-post')
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className='moreView'>
          <div className="cards">
            <ShimmerSimpleGallery card imageHeight={200}  caption />
          </div>
        </div>
      ) : fav.length > 0 ? (
        <div className="postParentDiv">
          <div className="moreView">
            <div className="heading">
              <span>Your favorites</span>
            </div>
            <div className="cards">
              {fav.map(post => {
                return (
                  <div className="card" key={post.id}>
                    <div className="favorite" onClick={() => handleRemoveFav(post.id)}>
                      <FilledHeart />
                    </div>
                    <div className="image" onClick={() => handleView(post)}>
                      <img src={post.url} alt={`Image of ${post.name}`} />
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
        </div>
      ) : (
        <div className='no-fav'>
          <img src="../../Images/no-favorites.webp" alt="No favorites" />
        </div>
      )}
    </>
  );
};
