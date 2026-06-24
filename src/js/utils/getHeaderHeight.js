export function initHeaderHeight(selector) {
  const header = document.querySelector(selector);
  if (!header) return;

  const update = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.offsetHeight}px`
    );
  };

  update();

  new ResizeObserver(update).observe(header);
}
