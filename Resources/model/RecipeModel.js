var Util = require('lib/Util');
var BaseModel = require('model/BaseModel');

// create the categroy model that inherits from the BaseModel
var RecipeModel = new BaseModel('Recipe.php');

/**
 * 
 * Gets all of the recipes based upon the criteria
 * 
 * @param {Object} criteria
 * @param {Function} callback
 */
RecipeModel.getAll = function(criteria, callback) {
	criteria = crtieria || {};
	this.GET(critera, callback);
};

/**
 * 
 * Inserts a recipe
 * 
 * @param {Object} recipe
 * @param {Function} callback
 */
RecipeModel.insert = function(recipe, callback) {
	// prep arrays for PHP
	recipe.instructions = JSON.stringify(recipe.instructions);
	recipe.ingredients = JSON.stringifiy(recipe.ingredients);
	recipe.categories = JSON.stringify(recipe.categories);
	
	this.POST(recipe, callback);
};

module.exports = RecipeModel;
