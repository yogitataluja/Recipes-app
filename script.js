const meals = document.getElementById('meals')
const favoriteContainer= document.getElementById('fav-meals')
getRandomMeal()
fetchfavMeals()
async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const respData = await resp.json()
    const randomMeal = respData.meals[0]
    console.log(randomMeal)
    addMeal(randomMeal, true)
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)

    const respData = await resp.json()
    const meal = respData.meals[0]
    return meal
}
async function getMealsBySearch(term) {

    const meals = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}
function addMeal(mealData, random = false) {
    console.log(mealData)
    const meal = document.createElement('div')
    meal.classList.add('meal')//  for add new classname to
    //random? is  conditional operator condition ? val1 : val2 ---If condition is true, the operator has the value of val1. Otherwise it has the value of val2.
    meal.innerHTML = `
<div class="meal-header">
    ${random ? `<span class="random">
    Random Recipe
  </span>` : ''}    
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" >
</div>
<div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn" > <i class="fas fa-heart"> </i></button>
</div>`// add event listner to this button
    const btn = meal.querySelector('.meal-body .fav-btn')
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal)
            btn.classList.remove('active')
        } else {
            addMealLS(mealData.idMeal)
            btn.classList.add('active')
        }
        favoriteContainer.innerHTML=''
    fetchfavMeals()

    })
    meals.appendChild(meal)
}
function addMealLS(mealId) {  // for add in favourate meal
    const mealIds = getMealsLS()// object or array store in mealIds
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}
function removeMealLS(mealId) {  // for remove if already added
    const mealIds = getMealsLS()
    localStorage.setItem('mealIds',
        JSON.stringify(mealIds.filter((id) => id !== mealId)))
}
function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds
}// return value or object or array in mealids
async function fetchfavMeals() {
    const mealIds = getMealsLS()
    const meals = []
    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i]
        meal = await getMealById(mealId)
        addMealfav(meal)
    }

}
function addMealfav(mealData) {
    console.log(mealData)
    const favmeal = document.createElement('li')
    
    favmeal.innerHTML = `
     <img src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
     /><span>${mealData.strMeal}</span>`
   
    favoriteContainer.appendChild(favmeal)
}