function ingredients_element(root_ID, ingredients) {
  
    // create div
    const container = make_elem({
        id : `${root_ID}_ingredients`,
        HTML: `<label for = "${root_ID}_ingredients">Ingredients & Quantities:<label/>`
    });

    // Iterate over ingredients using forEach
    Object.keys(ingredients).forEach((ingredient, index) => {
        container.innerHTML += `
        <input type = "text" id = "${root_ID}_ingredient-${index + 1}" list = "ingredientList" class = "text-input"></input>
        <input type = "number" id = "${root_ID}_quantity-${index + 1}" class = "quantity-input"></input>
        <br>`
    });

    return container;
}
  
function garnishes_element(root_ID, garnishes) {

    const container = make_elem({
        id : `${root_ID}_garnishes`,
        HTML: `<label for = "${root_ID}_garnishes">Garnish:<label/>`
    });

    garnishes.forEach((garnish, index) => {
        container.innerHTML += `<input id = "${root_ID}_garnish-${index + 1}" list = "garnishList">`
    });
  
    return container;
}