const catContainer = elementById('catContainerNav');
const randomRecipeContainer = elementById('randomRecipeContainer');
const recipeModal = elementById('my_modal_2');

const loadRecipeCat = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const data = await res.json();
    data.meals.forEach(category => {
        const newLi = document.createElement('div');
        newLi.innerHTML = `
            <li onclick="loadRecipeSingle('${category.strCategory}')"><a>${category.strCategory}</a></li>
        `
        catContainer.appendChild(newLi);
    });
}
const loadRecipeSingle = async (category) => {
    randomRecipeContainer.innerHTML='';
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    const allData = data;
    allData.meals.forEach(recipe => {


        console.log(recipe);
        const newDiv = document.createElement('div');
        newDiv.classList = 'singleRecipe card w-96';
        newDiv.innerHTML = `
            <figure><img class="rounded-full w-52" src=${recipe.strMealThumb}
            alt="car!" /></figure>
            <div class="card-body">
                <h2 class="card-title">${recipe.strMeal}</h2>
                <button class="btn btn-primary" onclick="recipeByID('${recipe.idMeal}')">Learn now!</button>
                <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
                <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop"> 
                    <button>close</button>
                </form>
                </dialog>
            </div>
        `
        randomRecipeContainer.appendChild(newDiv);
    });
}
const recipeByID = async (recipeId) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await res.json();
    const recipeFromId=data;
    
    
}
loadRecipeSingle('Beef');
loadRecipeCat();