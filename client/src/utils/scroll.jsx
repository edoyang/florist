export const updateScrollPosition = (carouselRef, setScrollPosition) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    setScrollPosition({
        canScrollLeft: carousel.scrollLeft > 0,
        canScrollRight: carousel.scrollLeft < maxScrollLeft 
    });
};
  