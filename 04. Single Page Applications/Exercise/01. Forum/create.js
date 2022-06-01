export async function createForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const topicName = data.get("topicName");
    const username = data.get("username");
    const postText = data.get("postText");

    if (e.submitter.textContent === "Cancel") {
        console.log ('ssssssss')
        e.target.reset();
        return;
    }

    const post = {
        topicName,
        username,
        postText,
        posts: {},
    };

    const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(post),
    });
    console.log(response);
    e.target.reset();
}

export async function getAllPosts() {
    const url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    const response = await fetch(url);

    const data = await response.json();
    return data;
}

export async function createComment(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const postText = data.get("postText");

    const comment = {
        postId:e.target.parentElement.parentElement.parentElement.parentElement.id,
        username,
        postText,
    };
    const url = "http://localhost:3030/jsonstore/collections/myboard/comments";
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    console.log(response);
    e.target.reset();
}

export async function getAllComments() {
    const  url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}