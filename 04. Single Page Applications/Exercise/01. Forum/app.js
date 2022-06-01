import {
    createForm,
    getAllPosts,
    createComment,
    getAllComments,
} from "./create.js";

import { createRow } from "./catalogPosts.js";

document.getElementsByClassName("topic-title")[0].innerHTML = "";

document.getElementsByTagName("form")[0].addEventListener("submit", createForm);


const views = document.getElementById("views");
document.getElementById("views").remove();

async function drawThePosts() {
    const data = await getAllPosts();
    console.log(Object.values(data));
    let rows = Object.values(data).map(createRow).join("");
    document.getElementsByClassName("topic-title")[0].innerHTML = rows;
}
drawThePosts();

document
    .getElementsByClassName("topic-title")[0]
    .addEventListener("click", createNewPage);


async function createNewPage(e) {
    e.preventDefault();

    if (e.target.tagName === "H2") {
        const posts = await getAllPosts();
        const post = Object.values(posts).filter(
            (x) =>
                x._id ===
                e.target.parentElement.parentElement.parentElement.parentElement.id
        )[0];

        document.getElementsByClassName("container")[0].innerHTML = "";
        const themeContent = document.createElement("div");
        themeContent.classList.add("theme-content");

        const themeTitle = `
   <div class="theme-content">
   <!-- theme-title  -->
   <div class="theme-title">
       <div class="theme-name-wrapper">
           <div class="theme-name">
               <h2>${post.topicName}</h2>
               <p>Date: <time>2020-10-10 12:08:28</time></p>
           </div>
           <div class="subscribers">
               <p>Subscribers: <span>456</span></p>
               <!-- <button class="subscribe">Subscribe</button>
               <button class="unsubscribe">Unsubscribe</button> -->
           </div>
       </div>
   </div>
</div>
   `;
        //get all comments
        const allcomments = await getAllComments();
        console.log(allcomments);
        const comments = ``;

        const answerComment = `
    <div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>
   `;
        themeContent.innerHTML=themeTitle;
        themeContent.innerHTML+=comments;
        themeContent.innerHTML+=answerComment;
        document.getElementsByClassName("container")[0].appendChild(themeContent);
    }
}
document
    .getElementsByClassName("answer-comment")[0]
    .addEventListener("submit", createComment);