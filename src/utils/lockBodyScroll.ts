let scrollBarCompensationApplied = false;
let previousOverflow = '';
let previousPaddingRight = '';

export function lockBodyScroll() {
  const body = document.body;
  const html = document.documentElement;

  previousOverflow = body.style.overflow;
  previousPaddingRight = body.style.paddingRight;

  const scrollBarWidth = window.innerWidth - html.clientWidth;

  if (scrollBarWidth > 0) {
    body.style.paddingRight = `${scrollBarWidth}px`;
    scrollBarCompensationApplied = true;
  }

  body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
  const body = document.body;

  body.style.overflow = previousOverflow;

  if (scrollBarCompensationApplied) {
    body.style.paddingRight = previousPaddingRight;
    scrollBarCompensationApplied = false;
  }
}
