function handle_new_category(){
    // Prompt user for the name of the category
    var categoryName = prompt("Enter the name of the category:");
    // Check if the category name is empty or null
    if (!categoryName) {
        alert("Invalid input for the category name. Please enter a valid name.");
        return;
    }
    document.getElementById("add_category_button").remove();
    document.getElementById("sumbit-edit-button").remove();
    document.getElementById("quizForm").appendChild(gen_category_wrapper(categoryName));
    document.getElementById(`${categoryName}_questions`).appendChild(gen_add_cocktail_button(categoryName));
    document.getElementById("quizForm").appendChild(gen_add_category_button());
    document.getElementById("quizForm").appendChild(gen_test_sumbit_button());
}

function handle_new_cocktail(category) {

    // Prompt user for the name of the cocktail
    var cocktailName = prompt("Enter the name of the cocktail:");
    // Check if the cocktail name is empty or null
    if (!cocktailName) {
        alert("Invalid input for the cocktail name. Please enter a valid name.");
        return;
    }

    // Prompt user for the number of ingredients        
    var numIngredients = parseInt(prompt("Enter the number of ingredients (1 to 20):"));
    // Validate the input
    if (isNaN(numIngredients) || numIngredients <= 0 || numIngredients > 20) {
        alert("Invalid input for the number of ingredients. Please enter a positive integer between 1 and 20.");
        return;
    }

    // Prompt user for the number of garnishes
    var numGarnishes = parseInt(prompt("Enter the number of garnishes (1 to 20):"));
    // Validate the input
    if (isNaN(numGarnishes) || numGarnishes <= 0 || numGarnishes > 20) {
        alert("Invalid input for the number of garnishes. Please enter a positive integer between 1 and 20.");
        return;     
    }

    document.getElementById(`${category}_add`).remove();
    if (document.getElementById(`${category}_remove`)){document.getElementById(`${category}_remove`).remove()};
    document.getElementById(`${category}_questions`).appendChild(gen_cocktail({
        name: cocktailName,
        ingredients : Object.fromEntries(Array(numIngredients).fill(["Enter ingredient", 0])),
        glass : "Enter glass",
        garnish : Array(numIngredients).fill("Enter garnish"),
        method : "Enter method"
    }, edit_mode = true));
    document.getElementById(`${category}_questions`).appendChild(gen_add_cocktail_button(category));
    document.getElementById(`${category}_questions`).appendChild(gen_remove_category_button(category));
}