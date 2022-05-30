const viewBtn = document.getElementById('btnViewPost');

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', createPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
};

attachEvents();


async function createPosts() {
    document.getElementById('btnLoadPosts').disabled = true;
    const posts = await getPosts();
    const id_Posts = document.getElementById('posts');
    id_Posts.innerHTML = '';
    for (const currPost of posts) {
        /* Post object  {
         body: {postBody},
         id: {postId},
         title: {postTitle} 
        }
        */
        const option = document.createElement('option');
        option.setAttribute('value', `${currPost.id}`);
        option.textContent = `${currPost.title}`
        id_Posts.appendChild(option);
    }
}

async function displayPost() {

    const postId = document.getElementById('posts').value;
    const allPosts = await getPosts();

    const currentPost = allPosts.filter(currentPost => currentPost.id === postId);
    const title = currentPost[0].title;
    const postBody = currentPost[0].body;

    document.getElementById('post-body').innerHTML = '';

    document.querySelector('h1').textContent = title;
    const liBody = document.createElement('li');
    liBody.textContent = postBody;
    document.getElementById('post-body').appendChild(liBody);

    const comments = await getComments();

    const commentsUL = document.getElementById('post-comments');
    commentsUL.innerHTML = '';
    /*
    { 
     id: {commentId},
     postId: {postId},
     text: {commentText}
    }
    */

    for (const comment of comments) {
        if (comment.postId == postId) {
            const li = document.createElement('li');
            li.textContent = comment.text;
            commentsUL.appendChild(li);
        }
    }
}

async function getComments() {
    const postId = document.getElementById('posts').value;
    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const response = await fetch(url);
    const data = await response.json();
    const commentsArray = Object.values(data);
    const currentCommentId = commentsArray.filter(comment => comment.postId === postId);
    return currentCommentId;
}

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();
    const posts = Object.values(data);
    return posts;
}
