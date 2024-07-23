import React, { useState, useEffect } from 'react';
import { addComment, fetchRecipe } from '../utils/api';

const Comments = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchRecipe(recipeId)
      .then((response) => {
        setComments(response.data.comments || []); // Ensure comments is an array
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setComments([]); // Set comments to an empty array in case of error
      });
  }, [recipeId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(recipeId, { comment: newComment })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      <ul className="mb-4">
        {comments.map((comment) => (
          <li key={comment.id} className="mb-2">
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comments;
