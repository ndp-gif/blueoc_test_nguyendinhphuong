import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { addPost } from './postSlice';
import styles from './PostForm.module.scss';

interface FormErrors {
  title?: string;
  body?: string;
  userId?: string;
}

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addingPost } = useSelector((state: RootState) => state.posts);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.length < 3) newErrors.title = 'Title must be at least 3 characters';
    
    if (!body.trim()) newErrors.body = 'Body is required';
    else if (body.length < 10) newErrors.body = 'Body must be at least 10 characters';
    
    if (!userId || userId < 1) newErrors.userId = 'User ID must be at least 1';
    else if (userId > 10) newErrors.userId = 'User ID cannot exceed 10';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ title: true, body: true, userId: true });
    if (!validate()) return;

    await dispatch(addPost({ userId, title, body }));
    setTitle('');
    setBody('');
    setUserId(1);
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h2 className={styles.title}>Create New Post</h2>

      <div className={styles.field}>
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          min={1}
          max={10}
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          onBlur={() => handleBlur('userId')}
          className={`${styles.userIdInput} ${touched.userId && errors.userId ? styles.errorInput : ''}`}
        />
        {touched.userId && errors.userId && (
          <div className={styles.errorMessage}>{errors.userId}</div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur('title')}
          className={touched.title && errors.title ? styles.errorInput : ''}
        />
        {touched.title && errors.title && (
          <div className={styles.errorMessage}>{errors.title}</div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          placeholder="Enter post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={() => handleBlur('body')}
          rows={4}
          className={touched.body && errors.body ? styles.errorInput : ''}
        />
        {touched.body && errors.body && (
          <div className={styles.errorMessage}>{errors.body}</div>
        )}
      </div>

      <button type="submit" disabled={addingPost} className={styles.button}>
        {addingPost ? 'Submitting...' : 'Submit Post'}
      </button>
    </form>
  );
};

export default PostForm;