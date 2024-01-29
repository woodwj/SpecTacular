function markIngredients(cocktail){
    let score = 0;
    const n_ingredients = Object.keys(cocktail.ingredients).length;
    // Create a dictionary to store user guesses for ingredients
    let ingredient_answers = {...cocktail.ingredients};
    for (let i = 1; i <= n_ingredients; i++) {

        // Store user guesses in the ingredient_guesses dictionary
        const ingredientG = document.getElementById(`${cocktail.name}_ingredient-${i}`).value;
        const quantityG = document.getElementById(`${cocktail.name}_quantity-${i}`).value;

        // Check if the ingredientName exists in cocktail.ingredients
        if (ingredient_answers.hasOwnProperty(ingredientG)) {
            document.getElementById(`${cocktail.name}_ingredient-${i}`).style.border = "2px solid green";
            const quantityAnswer = ingredient_answers[ingredientG];
            delete ingredient_answers[ingredientG];
            if (quantityAnswer == parseInt(quantityG, 10)) {
                // The answer is correct for both ingredient and quantity;
                document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid green";
                score++; // Increment score for both correct ingredient and quantity
            } else {                        
                document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid red";
            }
        } else {
            // Handle the case where the ingredientName doesn't exist in cocktail.ingredients
            document.getElementById(`${cocktail.name}_ingredient-${i}`).style.border = "2px solid red";
            document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid red";
        }
    }
    return [score, n_ingredients];
}

function markGlass(cocktail){
    let score = 0;
    const glass_guess = document.getElementById(`${cocktail.name}_glass`).value;
    if (glass_guess == cocktail.glass) {
        score ++;
        document.getElementById(`${cocktail.name}_glass`).style.border = "2px solid green";
    }
    else {
        document.getElementById(`${cocktail.name}_glass`).style.border = "2px solid red";
    }
    return [score,1];
}

function markGarnish(cocktail) {
    let score = 0;    
    const max_score = cocktail.garnish.length;

    let garnishAnswers = [...cocktail.garnish]; // Use spread operator to create a copy array
    garnishAnswers.forEach((garnish, i) => {
        let garnish_guess = document.getElementById(`${cocktail.name}_garnish-${i + 1}`).value;
        
        // Use includes() to check if the guess is in the array
        if (garnishAnswers.includes(garnish_guess)) {
            garnishAnswers = garnishAnswers.filter(answer => answer !== garnish_guess);
            score++;
            document.getElementById(`${cocktail.name}_garnish-${i + 1}`).style.border = "2px solid green";
        } else {
            document.getElementById(`${cocktail.name}_garnish-${i + 1}`).style.border = "2px solid red";
        }
    });

    return [score, max_score];
}

function markMethod(cocktail){
    let score = 0;
    const method_guess = document.getElementById(`${cocktail.name}_methods`).value;
    if (method_guess == cocktail.method) {
        score ++;
        document.getElementById(`${cocktail.name}_methods`).style.border = "2px solid green";
    }
    else {
        document.getElementById(`${cocktail.name}_methods`).style.border = "2px solid red";
    }
    return [score,1];
};

function markCocktail(cocktail) {
    let total_score = 0;
    let total_max_score = 0;
    for (const marker of [markIngredients, markGlass, markGarnish, markMethod]) {
        const [score, max_score] = marker(cocktail);
        total_score += score;
        total_max_score += max_score;
    }

    if (total_score == total_max_score) {
        document.getElementById(`${cocktail.name}_title`).style.color = "green";
        return [1,1];
    } else {
        document.getElementById(`${cocktail.name}_title`).style.color = "red";
        return [0,1];
    }
}

function getColorStyle(percentage) {
    const hue = (percentage / 100) * 120; // 0 (green) to 120 (red)
    return `hsl(${hue}, 100%, 50%)`;
}

function handle_test_submission(event, JSONObject) {
    event.preventDefault();
    document.getElementById("submit-test-button").remove();
    const scoreDiv = make_elem({id: "scoreArea"});

    let totalScore = 0;
    let totalMaxScore = 0;

    for (const [category, cocktail_list] of Object.entries(JSONObject)) {
        let categoryScore = 0;
        let categoryMaxScore = 0;
        cocktail_list.forEach(cocktail => {
            const [score, max_score] = markCocktail(cocktail);
            categoryScore += score;
            categoryMaxScore += max_score;
        });
        totalScore += categoryScore;
        totalMaxScore += categoryMaxScore;
        const percentage = Number(((categoryScore / categoryMaxScore) * 100).toFixed(0));
        scoreDiv.innerHTML += 
        `<p>${category} Score: ${categoryScore} / ${categoryMaxScore} (<span style="color: ${getColorStyle(percentage)}">${percentage}%</span>)</p>`;  
    }
    const percentage = Number(((totalScore / totalMaxScore) * 100).toFixed(0));
    scoreDiv.innerHTML += 
    `<hr>
    <p>Total Score: ${totalScore} / ${totalMaxScore} (<span style="color: ${getColorStyle(percentage)}">${percentage}%</span>)</p>`;
    document.body.appendChild(scoreDiv);
}