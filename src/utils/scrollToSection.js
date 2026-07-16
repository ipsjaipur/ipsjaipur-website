export const scrollToSection = (sectionId, offset = 100) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export const removeHashFromUrl = () => {
  // Use replaceState to remove hash without adding to history
  if (window.history.replaceState) {
    const urlWithoutHash = window.location.pathname + window.location.search;
    window.history.replaceState(null, '', urlWithoutHash);
  }
};

export const handleHashNavigation = (hash, offset = 100) => {
  if (!hash) return;

  const sectionId = hash.replace('#', '');

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    scrollToSection(sectionId, offset);

    // Remove hash after scrolling completes
    setTimeout(() => {
      removeHashFromUrl();
    }, 800); // Wait for smooth scroll to complete
  }, 100);
};
