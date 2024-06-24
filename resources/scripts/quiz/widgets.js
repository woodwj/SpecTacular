/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */
class widgetFactory{
    mode;
    constructor (mode) {this.mode = mode;}
    static make(attrs) {
        let elem = document.createElement(attrs.elem || "div");
        for (const [key, value] of Object.entries(attrs)) {
            if (key == "id")            {elem.id = value;}
            else if (key == "cls")      {elem.classList.add(value);}
            else if (key == "HTML")     {elem.innerHTML = value;}
            else if (key == "callback") {elem.addEventListener(...value);}
            else if (key == "textContent") {elem.textContent = value;}
            else if (key == "type")     {elem.type = value;}
            else if (key == "value")    {elem.setAttribute("value",value);}
            else if (key == "list")     {elem.setAttribute("list", value);}
        }
        return elem;
    }
    
    ingredients_input(cocktail) {
        // create div
        const container = widgetFactory.make({
            id : `${cocktail.name}_ingredients_box`,
            HTML: `<label for = "${cocktail.name}_ingredients_box">${this.mode == MODES.BAR?"Ingredients & Quantities":"Ingredients"}:</label>`
        });
        // Iterate over ingredients using forEach
        Object.entries(cocktail.ingredients).forEach(([ingredient, quantity], index) => {
            // if were not editing discard the answers
            if (this.mode != MODES.EDIT) {ingredient = ""; quantity = "";}
            // initialise ingredient text input, follow the id pattern and handle bar vs floor styling, with answer if editing
            container.appendChild(widgetFactory.make({
                elem: "input",
                type: "text",
                list: "ingredientList",
                id: `${cocktail.name}_ingredient-${index + 1}`,
                cls: this.mode == MODES.FLOOR ? "floor-ingredient-input" : "bar-ingredient-input",
                value: ingredient
            }));
            if (this.mode != MODES.FLOOR){container.innerHTML+=`<input type = "number" id = "${cocktail.name}_quantity-${index + 1}" class = "bar-quantity-input" value = "${quantity}"></input>`;}
            container.innerHTML += "<br>";
        });
        
        return container;
    }
    
    glass_input(cocktail){
        return widgetFactory.make({
            id : `${cocktail.name}_glass_box`,
            HTML : `
            <label for="${cocktail.name}_glasses">Glass:</label>
            <input id = "${cocktail.name}_glass" list = glassList value = "${this.mode == MODES.EDIT? cocktail.glass : ""}"></input>`
        });
    }

    ice_input(cocktail) {
        return widgetFactory.make({
            id : `${cocktail.name}_ice_box`,
            HTML : `
            <label for="${cocktail.name}_ice">Ice:</label>
            <input id = "${cocktail.name}_ice" list = iceList value="${this.mode == MODES.EDIT? cocktail.ice: ""}"></input>
            `
        });
    }
      
    garnishes_input(cocktail) {
        const container = widgetFactory.make({
            id : `${cocktail.name}_garnishes`,
            HTML: `<label for = "${cocktail.name}_garnishes">Garnish:<label/>`
        });
        cocktail.garnish.forEach((garnish, index) => {
            container.innerHTML += `<input id = "${cocktail.name}_garnish-${index + 1}" list = "garnishList" value = "${this.mode == MODES.EDIT? garnish: ""}"></input>`
        });
        return container;
    }
    
    method_input(cocktail) {
        return widgetFactory.make({
            id : `${cocktail.name}_method_box`,
            HTML : `
            <label for="${cocktail.name}_methods">Method:</label>
            <input id = "${cocktail.name}_methods" list = methodList value="${this.mode == MODES.EDIT? cocktail.method: ""}"></input>
            `
        });
    }

    history_input(cocktail) {
        return widgetFactory.make({
            id : `${cocktail.name}_history_box`,
            HTML : `
            <label for="${cocktail.name}_history">History:</label>
            <input type ="text" id = "${cocktail.name}_history" list = historyList value="${this.mode == MODES.EDIT? cocktail.history: ""}"></input>
            `
        });
    }

    sumbit_button(){
        return widgetFactory.make({
            elem : "button",
            id : this.mode==MODES.EDIT? "sumbit-edit-button": "submit-test-button",
            type: "sumbit",
            textContent : this.mode==MODES.EDIT? "Submit Changes" : "Sumbit Test",
        });
    }

    cocktail_wrapper(cocktail_name){
        return widgetFactory.make({
            id : `${cocktail_name}_question`,
            cls: "question",
            HTML: `<h3 id = "${cocktail_name}_title">${cocktail_name}</h3>`
        });
    }
    
    category_wrapper(category_name){
        return widgetFactory.make({
            id : `${category_name}_questions`,
            cls: "question-section",
            HTML: `<h2>${category_name}</h2>`
        });
    }
    
    remove_category_button(category_name){
        return widgetFactory.make({
            elem : "button",
            id : `${category_name}_remove`,
            textContent: "Remove Category",
            type : "button",
            callback : ["click", (_) => document.getElementById(`${category_name}_questions`).remove()]
        });
    }
    
    add_category_button(){
        return widgetFactory.make({
            elem : "button",
            id : "add_category_button",
            textContent: "Add Category",
            type : "button",
            callback : ["click", (_) => this.handle_new_category()]
        });
    }
    
    remove_cocktail_button(cocktail_name){
        return widgetFactory.make({
            elem : "button",
            id : `${cocktail_name}_remove`,
            textContent: "Remove Cocktail",
            type : "button",
            callback : ["click", (_) => document.getElementById(`${cocktail_name}_question`).remove()]
        });
    }
    
    add_cocktail_button(category_name){
        return widgetFactory.make({
            elem : "button",
            id : `${category_name}_add`,
            textContent: "New Cocktail",
            type : "button",
            callback : ["click", (_) => this.handle_new_cocktail(category_name)]
        });
    }

    handle_new_category(){
        // Prompt user for the name of the category
        var categoryName = prompt("Enter the name of the category:");
        // Check if the category name is empty or null
        if (!categoryName) {
            alert("Invalid input for the category name. Please enter a valid name.");
            return;
        }
        
        let add_category_button = document.getElementById("add_category_button").cloneNode(true);
        let sumbit_button = document.getElementById("sumbit-edit-button").cloneNode(true);
        document.getElementById("add_category_button").remove();
        document.getElementById("sumbit-edit-button").remove();

        document.getElementById("quizForm").appendChild(this.category_wrapper(categoryName));
        document.getElementById(`${categoryName}_questions`).appendChild(this.add_cocktail_button(categoryName));
        document.getElementById("quizForm").appendChild(add_category_button);
        document.getElementById("quizForm").appendChild(sumbit_button);
    }
    
    handle_new_cocktail(category_name) {
        let cocktail = {
            glass : "Enter glass",
            method : "Enter method",
        };
    
        // Prompt user for the name of the cocktail
        let cocktailName = prompt("Enter the name of the cocktail:");
        // Check if the cocktail name is empty or null
        if (!cocktailName) {
            alert("Invalid input for the cocktail name. Please enter a valid name.");
            return;
        }
        cocktail.name = cocktailName;
    
        // Prompt user for the number of ingredients        
        let numIngredients = parseInt(prompt("Enter the number of ingredients (1 to 15):"));
        // Validate the input
        if (isNaN(numIngredients) || numIngredients <= 0 || numIngredients > 15) {
            alert("Invalid number of ingredients. Please enter a number between 1 and 15.");
            return;
        }
        cocktail.ingredients = Object.fromEntries(Array(numIngredients).fill(["Enter ingredient", 0]));
    
        // Prompt user for the number of garnishes
        let numGarnishes = parseInt(prompt("Enter the number of garnishes (0 to 5):"));
        // Validate the input
        if (!isNaN(numGarnishes) && (numGarnishes  >= 1 && numGarnishes <= 5)) {
            cocktail.garnish = Array(numGarnishes).fill("Enter garnish");
        }
        else if (!isNaN(numGarnishes) && numGarnishes != 0) {
            alert("Invalid input for the number of garnishes. Please enter a number between 0 and 5.");
            return;
        }

        // Prompt user for an optional ice component
        let ice = prompt("Enter an optional ice component or skip:");
        // Varify and add the ice
        if (ice !== "") {cocktail.ice = ice;}

        // Prompt user for an optional history
        let history = prompt("Enter an optional history or skip:");
        // Varify and add the history
        if (history !== "") {cocktail.history = history;}


        document.getElementById(`${category_name}_add`).remove();
        if (document.getElementById(`${category_name}_remove`)){document.getElementById(`${category_name}_remove`).remove()};
        document.getElementById(`${category_name}_questions`).appendChild(this.gen_cocktail(cocktail));
        document.getElementById(`${category_name}_questions`).appendChild(this.add_cocktail_button(category_name));
        document.getElementById(`${category_name}_questions`).appendChild(this.remove_category_button(category_name));
    }

    gen_cocktail(cocktail) {
        // Wrapper for each cocktail with title
        const cocktailDiv = this.cocktail_wrapper(cocktail.name);
        // cocktail ingredients + quantities input elements
        cocktailDiv.appendChild(this.ingredients_input(cocktail));
        // cocktail glass input element
        cocktailDiv.appendChild(this.glass_input(cocktail));
        // cocktail ice input elements
        if (cocktail.hasOwnProperty("ice")) {cocktailDiv.appendChild(this.ice_input(cocktail));}
        // cocktail garnish input elements
        if (cocktail.hasOwnProperty("garnish")) {cocktailDiv.appendChild(this.garnishes_input(cocktail));}
        // cocktail method input element
        cocktailDiv.appendChild(this.method_input(cocktail));
        // optional history
        if (cocktail.hasOwnProperty("history")) {cocktailDiv.appendChild(this.history_input(cocktail));}
      
        // if editing a test, add a remove cocktail button
        if (this.mode == MODES.EDIT) {cocktailDiv.appendChild(this.remove_cocktail_button(cocktail.name));}
        return cocktailDiv;
      }
    
    gen_category(category,cocktail_list){
        
          // category wrapper with title
          let categoryDiv = this.category_wrapper(category);
          
          // generate each cocktail in the category
          cocktail_list.forEach(cocktail => {categoryDiv.appendChild(this.gen_cocktail(cocktail));});
      
          // add cocktail button at the end of category
          if (this.mode == MODES.EDIT) {
            categoryDiv.appendChild(this.add_cocktail_button(category));
            categoryDiv.appendChild(this.remove_category_button(category));
          }
          return categoryDiv;

    }
    
}