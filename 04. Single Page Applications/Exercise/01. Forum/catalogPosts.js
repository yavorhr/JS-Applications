export  function createRow(post) {
    const row= `
  <div class="topic-container" id="${post._id}">
  <div class="topic-name-wrapper">
      <div class="topic-name">
          <a id="link" href="#" class="normal">
              <h2>${post.topicName}</h2>
          </a>
          <div class="columns">
              <div>
                  <p>Date: <time>${Date.now()}</time></p>
                  <div class="nick-name">
                      <p>Username: <span>${post.username}</span></p>
                  </div>
              </div>
              <div class="subscribers">
                  <!-- <button class="subscribe">Subscribe</button> -->
                  <p>Subscribers: <span>456</span></p>
              </div>
          </div>
      </div>
  </div>
</div>
  `
    return row;
}