/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */
class editor{
    #menu_name;
    #menu_password;
    constructor(menu_name, menu_password) {
        this.#menu_name = menu_name;
        this.#menu_password = menu_password;
    }

    // refactor: optional history 
    handle_submission(event) {
        event.preventDefault();
        const [menu_name, passcode] = [this.#menu_name,this.#menu_password];
    
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
                let cocktail = {};
                const cocktailName = cocktailDiv.querySelector('h3').textContent;
                cocktail.name = cocktailName;
    
                // iterate ingredient Div for each 2 child input elems with int i
                // ingredients : { ${cocktail_name}_ingredient-${i}  : ${cocktail_name}_quantity-${i} }
                let ingredients = {};
                let ingredientInputs = cocktailDiv.querySelectorAll('[id^="' + cocktailName + '_ingredient-"]');
                ingredientInputs.forEach((input, index) => {
                    const ingredientName = input.value;
                    const quantity = parseInt(document.getElementById(cocktailName + '_quantity-' + (index + 1)).value,10);
                    ingredients[ingredientName] =  quantity 
                });
                cocktail.ingredients = ingredients;
    
                // Extract glass : ${cocktail_name}_glass
                cocktail.glass = document.getElementById(cocktailName + '_glass').value;
    
                // iterate garnishDiv for each child input elems with int i
                // garnish : [ ${cocktail_name}_garnish-{i} ]
                let garnishes = [];
                let garnishInputs = cocktailDiv.querySelectorAll('[id^="' + cocktailName + '_garnish-"]');
                garnishInputs.forEach(input => {
                    garnishes.push(input.value);
                });
                if (garnishes.length > 0) {cocktail.garnish = garnishes;}
    
                // method : {cocktail_name}_method
                cocktail.method = document.getElementById(cocktailName + '_methods').value;

                // optional ice: {cocktail_name}ice
                const iceElement = document.getElementById(cocktailName + 'ice');
                if (iceElement) {
                    cocktail.ice = historyElement.value;
                }

                // optional history: {cocktail_name}_history
                const historyElement = document.getElementById(cocktailName + '_history');
                if (historyElement) {
                    cocktail.history = historyElement.value;
                }
                // cocktailList : [cocktail , ...]
                cocktailList.push(cocktail);
            });
    
            // menu : {category : cocktailList}
            menu[categoryName] = cocktailList;
        });
    
        // encrypt menu with passcode and download new menu with name
        encrypt_download(menu, file_name, passcode);
    }
    
}