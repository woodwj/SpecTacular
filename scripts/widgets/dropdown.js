function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function populate_datalist(datalist, options) {
  options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      datalist.appendChild(optionElement);
  });
}

function extract_component_datalists(JSONObject) {
  const ingredientDatalist = document.createElement("datalist", id = "ingredientList");
  const glassDatalist = document.createElement("datalist", id = "glassList");
  const garnishDatalist = document.createElement("datalist", id = "garnishList");
  const methodDatalist = document.createElement("datalist", id = "methodList");

  // Initialize empty arrays for each component
  let ingredients = [];
  let glasses = [];
  let garnishes = [];
  let methods = [];

  // Iterate over each alcohol type in the JSON object
  for (const alcoholType in JSONObject) {
    const cocktails = JSONObject[alcoholType];

    // Iterate over each cocktail in the current alcohol type
    cocktails.forEach(cocktail => {
      // Extract and push ingredients, glass, garnish, and method to respective arrays
      ingredients.push(...Object.keys(cocktail.ingredients));
      glasses.push(cocktail.glass);
      garnishes.push(...cocktail.garnish);
      methods.push(cocktail.method);
    });
  }
  // Remove duplicate values from arrays
  ingredients = shuffleArray(Array.from(new Set(ingredients)));
  glasses = shuffleArray(Array.from(new Set(glasses)));
  garnishes = shuffleArray(Array.from(new Set(garnishes)));
  methods = shuffleArray(Array.from(new Set(methods)));

  // Populate datalist elements with dynamic options
  populate_datalist(ingredientDatalist, ingredients);
  populate_datalist(glassDatalist, glasses);
  populate_datalist(garnishDatalist, garnishes);
  populate_datalist(methodDatalist, methods);

  // Return the datalist elements
  return {
    ingredientDatalist,
    glassDatalist,
    garnishDatalist,
    methodDatalist,
  };
}