export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('public');
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('src/images');

	// Returns post folders items, sorted by display order
	eleventyConfig.addCollection('books', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/books/*.md')]);
	});
	eleventyConfig.addCollection('food', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/food/*/*.md')]);
	});
	eleventyConfig.addCollection('music', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/music/*/*.md')]);
	});
	eleventyConfig.addCollection('tech', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/tech/*/*.md')]);
	});
	eleventyConfig.addCollection('thoughts', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/thoughts/*.md')]);
	});
	eleventyConfig.addCollection('travel', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/travel/*/*/*.md')]);
	});
}

export const config = {
	markdownTemplateEngine: 'njk',
	htmlTemplateEngine: 'njk',
};

/**
 * Takes a collection and returns it back in display order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
function sortByDisplayOrder(collection) {
	return collection.sort((a, b) =>
		Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1,
	);
}