function handle_edit_submisson(event, ...credentials) {
    event.preventDefault();
    const [menu_name, passcode] = credentials;

    let file_name = menu_name.endsWith(".menu") ? menu_name : menu_name + ".menu";

    const questionElements = document.querySelectorAll('[id$="_question"]');
    if (!questionElements.length > 0) {alert("Error the Menu must contain at least 1 cocktail");return}

    const form = document.getElementById("quizForm");
    const menu = {};

    // // iterate quizForm's child section Divs, id = ${category_name}_questions
    const categoryDivs = form.querySelectorAll('.question-section');
    categoryDivs.forEach(categoryDiv => {
        const categoryName = categoryDiv.querySelector('h2').textContent;
        const cocktailList = [];

        // iterate ${category_name}_questions 's child divs, id = ${cocktail_name}_question
        const cocktailDivs = categoryDiv.querySelectorAll('.question');
        cocktailDivs.forEach(cocktailDiv => {
            const cocktailName = cocktailDiv.querySelector('h3').textContent;

            // iterate ingredient Div for each 2 child input elems with int i
            // ingredients : { ${cocktail_name}_ingredient-${i}  : ${cocktail_name}_quantity-${i} }
            const ingredients = {};
            const ingredientInputs = cocktailDiv.querySelectorAll('[id^="' + cocktailName + '_ingredient-"]');
            ingredientInputs.forEach((input, index) => {
                const ingredientName = input.value;
                const quantity = parseInt(document.getElementById(cocktailName + '_quantity-' + (index + 1)).value,10);
                ingredients[ingredientName] =  quantity 
            });

            // Extract glass : ${cocktail_name}_glass
            const glass = document.getElementById(cocktailName + '_glass').value;

            // iterate garnishDiv for each child input elems with int i
            // garnish : [ ${cocktail_name}_garnish-{i} ]
            const garnishes = [];
            const garnishInputs = cocktailDiv.querySelectorAll('[id^="' + cocktailName + '_garnish-"]');
            garnishInputs.forEach(input => {
                garnishes.push(input.value);
            });

            // method : {cocktail_name}_method
            const method = document.getElementById(cocktailName + '_methods').value;

            // Construct cocktail object : {name, ingredients, glass, garnish, method}
            const cocktail = {
                name: cocktailName,
                ingredients: ingredients,
                glass: glass,
                garnish: garnishes,
                method: method
            };

            // cocktailList : [cocktail , ...]
            cocktailList.push(cocktail);
        });

        // menu : {category : cocktailList}
        menu[categoryName] = cocktailList;
    });

    // encrypt menu with passcode and download new menu with name
    encrypt_download(menu, file_name, passcode);
}
