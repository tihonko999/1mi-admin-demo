const isMobile = window.screen.width < 600;

export default {
  isMobile,
  isDesktop: !isMobile,
};
