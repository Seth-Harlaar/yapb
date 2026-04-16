module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy("src/posts/**/*.{png,jpg,jpeg,gif,webp,svg}");
  eleventyConfig.addPassthroughCopy("src/websites/**/*.{png,jpg,jpeg,gif,webp,svg}");

  // Make current year available in all templates
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  // All posts sorted newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // All notes sorted newest first
  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/notes/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Websites (no sort needed — order is defined by file)
  eleventyConfig.addCollection("websites", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/websites/*.md");
  });

  // Format a Date → "April 10, 2026"
  eleventyConfig.addFilter("dateFormat", function (dateVal) {
    if (!dateVal) return "";
    const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  // Machine-readable date for <time datetime="...">
  eleventyConfig.addFilter("dateISO", function (dateVal) {
    if (!dateVal) return "";
    const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
    return d.toISOString().slice(0, 10);
  });

  return {
    pathPrefix: "/yapb/",
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      data:     "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
