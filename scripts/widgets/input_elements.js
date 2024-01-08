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

function ingredients_element(root_ID, ingredient_datalist, ingredients) {
  
    // create div
    const container = document.createElement("div");
    container.id = `${root_ID}_ingredients`
    const ingredientLabel = label_element_for("Ingredients & Quantities:", `${root_ID}_ingredients`);
    container.appendChild(ingredientLabel);

  
    // Iterate over ingredients using forEach
    Object.keys(ingredients).forEach((ingredient, index) => {
      const ingredientInput = input_dropdown(`${root_ID}_ingredient-${index + 1}`, ingredient_datalist);
      const quantityInput = input_quantity(`${root_ID}_quantity-${index + 1}`);
      // Add custom class to the ingredient input for styling
      ingredientInput.classList.add("text-input");
      // Add custom class to the quantity input for styling
      quantityInput.classList.add("quantity-input");
  
      // Append labels and inputs to the div
      container.appendChild(ingredientInput);
      container.appendChild(quantityInput);
      container.appendChild(document.createElement("br"));
    });
  
    return container;
}
  
function garnishes_element(root_ID, garnish_datalist, garnishes) {
    
    const container = document.createElement("div");
    container.id = `${root_ID}_garnishes`
    const garnishLabel = label_element_for("Garnish:", `${root_ID}_garnishes`);
    container.appendChild(garnishLabel);

    garnishes.forEach((garnish, index) => {
      const garnishInput = input_dropdown(`${root_ID}_garnish-${index + 1}`, garnish_datalist);
      container.appendChild(garnishInput);
    });
  
    return container;
}