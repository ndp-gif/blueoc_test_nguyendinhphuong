import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPage } from './postSlice';
import type { AppDispatch, RootState } from '../../app/store';
import styles from './PostList.module.scss';

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, currentPage, totalPages, limit } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  if (loading && posts.length === 0) return <div className={styles.loading}>Loading posts...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (posts.length === 0) return <div className={styles.empty}>No posts yet.</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;