import { posts, user } from "../index.js";
import { formatDate } from "../lib/formatDate/formatDate.js";
import { renderHeaderComponent } from "./header-component.js";
import { changeLike } from "./posts-page-component.js";
export function renderUserPostPageComponent({ appEl }) {
  const renderPosts = posts
    .map((post, index) => {
      let likesText;
      if (post.likes.length === 0) {
        likesText = "Нравится: <strong>0</strong>";
      } else if (post.likes.length === 1) {
        likesText = `Нравится: <strong>${
          JSON.stringify(post.likes[0].name) === "{}"
            ? "Кому-то"
            : post.likes[0].name
        }</strong>`;
      } else {
        const otherLikesCount = post.likes.length - 1;
        const otherLikesText = `<strong>еще ${otherLikesCount.toString()}</strong>`;
        likesText = `Нравится: <strong>${
          JSON.stringify(post.likes[post.likes.length - 1].name) === "{}"
            ? "Кому-то"
            : post.likes[post.likes.length - 1].name
        }</strong> и ${otherLikesText}`;
      }

      return `<li class="post">
      
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" data-is-liked="${
        post.isLiked
      }" class="like-button" data-index=${index}>  
              <img src="${
                post.isLiked
                  ? "./assets/images/like-active.svg"
                  : "./assets/images/like-not-active.svg"
              }">  
          </button>
          <p class="post-likes-text">
            ${likesText} 
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${formatDate(post.createdAt)}
        </p>
      </li>`;
    })
    .join("");
  const appHtml = `
              <div class="page-container">
                <div class="header-container">
                </div>
                  <div class="post-header post-user" data-user-id="${user.id}">
            <img src="${user.imageUrl}" class="post-header__user-image post-user">
            <p class="post-header__user-name post-user">${user.name}</p>
             </div>
                <ul class="posts">
                  ${renderPosts}
                  
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
  changeLike();
}
