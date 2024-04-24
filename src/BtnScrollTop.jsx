export function BtnScrollTop() {

  //button to scroll on top page
  function handleOnClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <button className="scrollToTopBtn" id="scrollToTopBtn" title="Go to top" onClick={handleOnClick}>
        Top
      </button>
    </div>
  );
}
