import rssPlugin from '@11ty/eleventy-plugin-rss';
import CleanCSS from "clean-css";
// Filters
import { dateFilter } from './src/filters/date-filter.js';
import { w3DateFilter } from './src/filters/w3-date-filter.js';

export default function (eleventyConfig) {
	// Add filters
	eleventyConfig.addFilter('dateFilter', dateFilter);
	eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});
	// set directories
	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('public');
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('src/images');

	// Plugins
	eleventyConfig.addPlugin(rssPlugin);

	// Returns post folders items, sorted by display order
	eleventyConfig.addCollection('books', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/books/**/*.md')]);
	});
	eleventyConfig.addCollection('food', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/food/**/*.md')]);
	});
	eleventyConfig.addCollection('music', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/music/**/*.md')]);
	});
	eleventyConfig.addCollection('tech', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/tech/**/*.md')]);
	});
	eleventyConfig.addCollection('thoughts', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/thoughts/**/*.md')]);
	});
	eleventyConfig.addCollection('travel', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/travel/**/*.md')]);
	});
	eleventyConfig.addCollection('allPosts', (collection) => {
		return sortByDisplayOrder([...collection.getFilteredByGlob('./src/**/*.md')]);
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