window.onload = function () {
  var grid = document.querySelector("#masonry-grid");

  // Debug: Log grid initialization
  console.log("Masonry grid initialized:", grid);

  // Initialize Masonry after all images are loaded
  imagesLoaded(grid, function () {
    console.log("All images loaded. Initializing Masonry...");

    var masonryInstance = new Masonry(grid, {
      itemSelector: ".project-tile",
      columnWidth: 300, // Set fixed column width to 300px
      gutter: 20,
      horizontalOrder: true, // Ensures left-to-right ordering
      percentPosition: true, // Helps ensure proper positioning even after image load
    });

    // Debug: Log Masonry instance and layout
    console.log("Masonry instance created:", masonryInstance);
    console.log("Grid width:", grid.offsetWidth);
    console.log("Number of columns:", Math.floor(grid.offsetWidth / 300));

    // Trigger Masonry layout after content is fully loaded and rendered
    masonryInstance.layout();

    // Add listener to recalculate layout when images are dynamically loaded or resized
    window.addEventListener("resize", function () {
      console.log("Window resized. Recalculating layout...");
      masonryInstance.layout();
    });
  });

  // Fallback timeout to recalculate layout if the images loaded slowly
  setTimeout(function () {
    console.log("Fallback layout recalculation triggered.");
    var grid = document.querySelector("#masonry-grid");
    var masonryInstance = new Masonry(grid, {
      itemSelector: ".project-tile",
      columnWidth: 300,
      gutter: 20,
      horizontalOrder: true,
    });
    masonryInstance.layout();
  }, 1000); // Trigger layout recalculation after 1 second if images load slowly
};
