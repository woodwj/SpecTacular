function knuth_shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function init_dropdown_datalists(JSONObject) {
  // Initialize empty arrays for each component
  let ingredients = [];
  let glasses = [];
  let garnishes = [];
  let methods = [];

  for (const alcoholType in JSONObject) {
    const cocktails = JSONObject[alcoholType];

    // Iterate over each cocktail
    cocktails.forEach(cocktail => {
      // push ingredients, glass, garnish, and method to respective arrays
      ingredients.push(...Object.keys(cocktail.ingredients));
      glasses.push(cocktail.glass);
      garnishes.push(...cocktail.garnish);
      methods.push(cocktail.method);
    });
  }
  // Remove duplicate values from arrays, shuffle, populate datalists and add to the document head
  for (const [id, list] of Object.entries({
    "ingredientList": ingredients,
    "glassList": glasses,
    "garnishList": garnishes,
    "methodList": methods
  })) {
    document.head.appendChild(
        make_datalist(
            id,
            knuth_shuffle(Array.from(new Set(list)))
        )
    );
  }
}