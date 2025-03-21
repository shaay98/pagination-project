"use strict";

let Page = 1
async function fetchPosts(page) {
  try {
    const URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;
    const res = await fetch(URL);
    const data = await res.json();
    renderPosts(data)
  } catch (error) {
    console.error(error);
  }
}
fetchPosts(1);


function renderPosts(posts) {
  const div = document.getElementById("Posts");
  div.innerHTML = "";
  const ul = document.createElement("ul");
  posts.forEach((name) => {
    const li = document.createElement("li");
    li.innerHTML = name.title;
    ul.appendChild(li);
  });
  div.appendChild(ul);
}
document.getElementById("btn-1").addEventListener("click", function () {
  this.disabled = "true"
 setTimeout(() => {
  console.log("Rate limit exceeded. Please wait.");
  Page++;
  fetchPosts(Page);
  this.disabled = false;
}, 2000);
});
document.getElementById("btn-2").addEventListener("click", () => {
  if (Page > 1) {
    Page--;
    fetchPosts(Page);
  }
});

fetchPosts()
