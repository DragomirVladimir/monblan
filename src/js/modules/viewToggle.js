const STORAGE_KEY = "postsListType";

function applyListType(postsList, type) {
  if (postsList) postsList.classList.toggle("table", type === "table");
  localStorage.setItem(STORAGE_KEY, type);
}

export function initViewToggle() {
  const postsList = document.getElementById("posts-list");
  const buttons = document.querySelectorAll(".js-set-list-type");
  let activeBtn = document.querySelector(".js-set-list-type._active");

  const savedType = localStorage.getItem(STORAGE_KEY);

  if (savedType) {
    const savedBtn = document.querySelector(
      `.js-set-list-type[data-list-type="${savedType}"]`,
    );
    if (savedBtn && savedBtn !== activeBtn) {
      if (activeBtn) activeBtn.classList.remove("_active");
      savedBtn.classList.add("_active");
      activeBtn = savedBtn;
    }
    applyListType(postsList, savedType);
  }

  buttons.forEach((btn) => {
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn === activeBtn) return;

      if (activeBtn) activeBtn.classList.remove("_active");
      btn.classList.add("_active");
      activeBtn = btn;

      applyListType(postsList, btn.dataset.listType);
    });
  });
}
