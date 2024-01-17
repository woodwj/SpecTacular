function input_dropdown(ID, datalist) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = ID;
    input.setAttribute("list", datalist.id);
    return input;
}

// Function to create a quantity input with dynamic ID
function input_quantity(ID) {
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = ID;
    return quantityInput;
}
  
function label_element_for(text, forID) {
    const label = document.createElement("label");
    label.textContent = text;
    label.setAttribute("for", forID);
    return label;
}

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