import React, { useState, useEffect } from 'react';
import { addComment } from '../utils/api';

const Comments = ({ recipeId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch existing comments for the recipe if needed
  }, [recipeId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    addComment(recipeId, comment)
      .then((response) => {
        setComments([...comments, response.data]);
        setComment('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className="comments">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          Submit
        </button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="border-b border-gray-300 py-2">
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
