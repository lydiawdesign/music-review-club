const newCommentHandler = async (event) => {
  event.preventDefault();
console.log (this);

  const comment = document.querySelector('#commentBody').value.trim();
  // const postId = document.querySelector('#commentSubmit').value.trim();
  const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  



  if (comment && postId) { 
    const response = await fetch(`/api/comments`, { //validate route
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to post comment');
    }
  }
};


document
  .querySelector('.newComment') 
  .addEventListener('submit', newCommentHandler);
  