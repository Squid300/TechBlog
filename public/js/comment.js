const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const id = document.querySelector('#post').innerHTML;

    if( comment ){
        const response = await fetch('/api/post/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment, id }),
        });

        if( response.ok ){
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);