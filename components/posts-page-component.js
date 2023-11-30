import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { addDislike, addLike } from "../api.js";
import { formatDate } from "../lib/formatDate/formatDate.js";
//Функция
export function changeLike() {
  const likeButton = document.querySelectorAll(".like-button");

  for (const likeElement of likeButton) {
    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();

      let id = likeElement.dataset.postId;
      let token = getToken();

      if (token === undefined) {
        alert("Пройдите авторизацию");
      } else {
        likeElement.dataset.isLiked === "true"
          ? addDislike({ id, token }).then((responseData) => {
              likeElement.innerHTML = `<img src="./assets/images/like-not-active.svg">`;

              renderLikeElement({ responseData, likeElement });
              likeElement.dataset.isLiked = "false";
            })
          : addLike({ id, token }).then((responseData) => {
              likeElement.innerHTML = `<img src="./assets/images/like-active.svg">`;

              renderLikeElement({ responseData, likeElement });
              likeElement.dataset.isLiked = "true";
            });
      }
    });
  }
}
//КонецФункции

// Рендер Лайков
const renderLikeElement = ({ responseData, likeElement }) => {
  const postLikesText = likeElement
    .closest(".post")
    .querySelector(".post-likes-text"); // ищем выше по дереву
  const likesCount = responseData.post.likes.length;

  let likesText = "";
  if (likesCount === 0) {
    likesText = `Нравится: <strong>0</strong>`;
  } else if (likesCount === 1) {
    likesText = `Нравится: <strong>${responseData.post.likes[0].name}</strong>`;
  } else {
    const otherLikesCount = likesCount - 1;
    const otherLikesText = `<strong>еще ${otherLikesCount.toString()}</strong>`;
    likesText = `Нравится: <strong>${
      responseData.post.likes[responseData.post.likes.length - 1].name
    }</strong> и ${otherLikesText}`;
  }

  postLikesText.innerHTML = `<p>${likesText}</p>`;
};

//Конец

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const renderPosts = posts
    .map((post, index) => {
      let likesText;
      if (post.likes.length === 0) {
        likesText = `Нравится: <strong>0</strong>`;
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
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${
                          post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
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
                        Нравится: <strong>${post.likes.length}</strong>
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
                <div class="header-container"></div>
                <ul class="posts">
                  ${renderPosts}
                  
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;
  changeLike();
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
