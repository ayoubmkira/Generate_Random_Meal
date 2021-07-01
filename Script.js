
const mainElm        = document.getElementById('main');
const btnNewMeal     = document.getElementById('btn');
const imageElm       = document.getElementById('image');
const ingredientsElm = document.getElementById('list-ingredients');
const mealNameElm    = document.getElementById('meal-name');
const instructionsElm = document.getElementById('instructions');

// Return Object Of Every Ingredient And Its Measure:
function filterIngredientsAndMeasures(meal) {

	let list = {};
	let entriesMeal = Object.entries(meal);
	let ingredientsAndMesures = entriesMeal.filter(value => {
		return value[0].startsWith('strIngredient') && value[1] !== '';
	}).forEach((ingredient, idx) => {
		let nameIngredient = ingredient[1];
		let measureIngredient = meal[`strMeasure${idx + 1}`];
		list[nameIngredient] = measureIngredient;
	});

	return list;

}

// Insert The Meal Into The Dom:
function insertMealIntoDom(meal) {

	const {
		strInstructions: instructions,
		strMealThumb: imageUrl,
		strMeal: name
	} = meal;
	const ingredientsAndMeasures = filterIngredientsAndMeasures(meal);

	imageElm.src = imageUrl;
	ingredientsElm.innerHTML = '';
	for(let prop in ingredientsAndMeasures) {
		ingredientsElm.innerHTML += `
			<li>
				<span class="name">${prop}</span> - 
				<span class="quantity">${ingredientsAndMeasures[prop]}</span>
			</li>
		`;
	}
	mealNameElm.innerText = name;
	instructionsElm.innerText = instructions;

}

// Show/Hide Loading:
function showLoading(show = true) {

	if(show) {
		imageElm.src = '';
		ingredientsElm.innerHTML = '';
		mealNameElm.innerText = '';
		instructionsElm.innerText = '';
		mainElm.setAttribute("data-wait", "wait");
	} else {
		mainElm.setAttribute("data-wait", "");
	}

}


function generateNewMeal() {

	showLoading(true);
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
	.then(response => response.json())
	.then(data => data.meals[0])
	.then(meal => {
		showLoading(false);
		insertMealIntoDom(meal);
	})
	.catch(error => console.log(error));

}
generateNewMeal();

btnNewMeal.addEventListener('click', generateNewMeal);