document.getElementById("search-btn").addEventListener("click", searchItems);

function searchItems() {
    const searchText = document.getElementById("search-box").value;
    document.getElementById("search-box").value = "";
    if (searchText === "") {
        return;
    }
    document.getElementById("meal-container-details").innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(response => response.json())
        .then(data => {
            const mealContainer = document.getElementById("meal-container");
            mealContainer.innerHTML = "";

            if (data.meals) {
                data.meals.forEach(meal => {
                    const div = document.createElement("div");
                    div.classList.add("meal-card");
                    div.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="Meal Image">
                        <h3>${meal.strMeal}</h3>
                    `;
                    mealContainer.appendChild(div);
                    div.onclick = () => itemDetais(meal.idMeal);
                });
            } else {
                mealContainer.innerHTML = "<p>No meals found!</p>";
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const itemDetais = (id) => {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);

            const meal = json.meals[0];
            const mealContainerDetails = document.getElementById("meal-container-details");
            mealContainerDetails.innerHTML = "";
            const div = document.createElement("div");
            div.classList.add("meal-card-details");
            div.innerHTML = `
                <img src="${meal.strMealThumb}" alt="">
                <h3>${meal.strMeal}</h3>
                <h6 class="Ingredient">Ingredient</h6>
                <ul id="ingredient-list"></ul>
            `;

            const ingredientList = div.querySelector("#ingredient-list");
            let i = 1;
            while (true) {
                let ingredient = meal[`strIngredient${i}`];
                if (!ingredient || ingredient.trim() === "") {
                    break;
                } else {
                    const li = document.createElement("li");
                    li.textContent = ingredient;
                    ingredientList.appendChild(li);
                }
                i++;
            }

            mealContainerDetails.appendChild(div);

        })
        .catch(err => {
            console.log(err);
        });
};