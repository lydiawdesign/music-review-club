const newFormHandler = async (event) => {
  event.preventDefault();

  const artistName = document.querySelector('#artistName').value.trim();
  const songTitle = document.querySelector('#songTitle').value.trim();
  const genre = document.querySelector('#genre').value.trim();
  const youtubeUrl = document.querySelector('#youtube').value.trim();
  const review = document.querySelector('#review').value.trim();

  if (artistName && songTitle && genre && review ) { //do we need youtubeurl?
    const response = await fetch(`/api/posts`, { //validate route
      method: 'POST',
      body: JSON.stringify({ artistName, songTitle, genre, youtubeUrl, review }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homeroute');
    } else {
      alert('Failed to create review');
    }
  }
};



document
  .querySelector('.newReviewForm') //add this to handlebards location
  .addEventListener('submit', newFormHandler);

