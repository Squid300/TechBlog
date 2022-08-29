const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if( title && content ){
        const response = await fetch('/api/post/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        if( response.ok ){
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);