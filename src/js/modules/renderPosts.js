const POSTS_PER_PAGE = 8;
const LOADER_DELAY = 1000;

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}

function createPostHTML(post) {
  return `
    <li class="post">
      <div class="post__img">
        <img src="${import.meta.env.BASE_URL}${post.image}" alt="" loading="lazy" />
      </div>
      <div class="post__info">
        <div class="post__col">
          <div class="post__col-inner">
            <span class="post__label">Today</span>
            <div class="post__stats">
              <div class="post__stat">
                <svg class="icon post__icon" aria-hidden="true"><use href="#icon-heart"/></svg>
                <span class="post__stat-count">${post.todayLikes}</span>
              </div>
              <div class="post__stat">
                <svg class="icon post__icon" aria-hidden="true"><use href="#icon-comment"/></svg>
                <span class="post__stat-count">${post.todayComments}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="post__col">
          <div class="post__col-inner">
            <span class="post__label">${formatDate(post.postDate)}</span>
            <div class="post__stats">
              <div class="post__stat">
                <svg class="icon post__icon" aria-hidden="true"><use href="#icon-heart"/></svg>
                <span class="post__stat-count">${post.totalLikes}</span>
              </div>
              <div class="post__stat">
                <svg class="icon post__icon" aria-hidden="true"><use href="#icon-comment"/></svg>
                <span class="post__stat-count">${post.totalComments}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="post__col post__col--type">
          <div class="post__col-inner post__col-inner--type">
            <span class="post__label">Image upload</span>
            <span class="post__upload-date">${formatDate(post.uploadDate)}</span>
          </div>
        </div>
      </div>
    </li>
  `;
}

function renderBatch(list, items) {
  list.insertAdjacentHTML('beforeend', items.map(createPostHTML).join(''));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setLoader(loader, show) {
  if (!loader) return;
  loader.classList.toggle('_active', show);
}

function updateBtn(btn, rendered, total) {
  if (!btn) return;
  const done = rendered >= total;
  btn.disabled = done;
  btn.classList.toggle('_active', !done);
}

export async function initRenderPosts() {
  const list = document.getElementById('posts-list');
  const loader = document.getElementById('posts-loader');
  const btn = document.getElementById('load-button');

  if (!list) return;

  let posts = [];
  let rendered = 0;

  setLoader(loader, true);

  try {
    const res = await fetch(import.meta.env.BASE_URL + 'data/posts.json');
    posts = await res.json();
    await delay(LOADER_DELAY);
  } catch (e) {
    console.error('Failed to load posts:', e);
  }

  setLoader(loader, false);
  renderBatch(list, posts.slice(0, POSTS_PER_PAGE));
  rendered = Math.min(POSTS_PER_PAGE, posts.length);
  updateBtn(btn, rendered, posts.length);

  if (!btn) return;

  btn.addEventListener('click', async () => {
    setLoader(loader, true);
    updateBtn(btn, posts.length, posts.length);

    await delay(LOADER_DELAY);

    renderBatch(list, posts.slice(rendered));
    rendered = posts.length;

    setLoader(loader, false);
    updateBtn(btn, rendered, posts.length);
  });
}
