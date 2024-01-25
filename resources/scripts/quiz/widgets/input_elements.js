function gen_ingredients_input(cocktail, edit_mode) {
    // create div
    const container = make_elem({
        id : `${cocktail.name}_ingredients`,
        HTML: `<label for = "${cocktail.name}_ingredients">Ingredients & Quantities:<label/>`
    });
    // Iterate over ingredients using forEach
    Object.entries(cocktail.ingredients).forEach(([ingredient, quantity], index) => {
        if (!edit_mode) {ingredient = ""; quantity = "";}
        container.innerHTML += `
        <input type = "text" id = "${cocktail.name}_ingredient-${index + 1}" list = "ingredientList" class = "text-input" value = "${ingredient}"></input>
        <input type = "number" id = "${cocktail.name}_quantity-${index + 1}" class = "quantity-input" value = "${quantity}"></input>
        <br>`;
    });
    return container;
}

function gen_glass_input(cocktail, edit_mode) {
    return make_elem({
        id : `${cocktail.name}_glasss`,
        HTML : `
        <label for="${cocktail.name}_glasses">Glass:</label>
        <input id = "${cocktail.name}_glass" list = glassList value = "${edit_mode? cocktail.glass : ""}"></input>`
    });
}
  
function gen_garnishes_input(cocktail, edit_mode) {
    const container = make_elem({
        id : `${cocktail.name}_garnishes`,
        HTML: `<label for = "${cocktail.name}_garnishes">Garnish:<label/>`
    });
    cocktail.garnish.forEach((garnish, index) => {
        container.innerHTML += `<input id = "${cocktail.name}_garnish-${index + 1}" list = "garnishList" value = "${edit_mode? garnish: ""}"></input>`
    });
    return container;
}

function gen_method_input(cocktail, edit_mode) {
    return make_elem({
        id : `${cocktail.name}_method`,
        HTML : `
        <label for="${cocktail.name}_methods">Method:</label>
        <input id = "${cocktail.name}_methods" list = methodList value="${edit_mode? cocktail.method: ""}"></input>
        `
    });
}