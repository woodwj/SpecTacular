function knuth_shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function make_datalist(id, options) {
  var datalist = document.createElement("datalist");
  datalist.id = id;
  options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      datalist.appendChild(optionElement);
  });
  return datalist;
}

function init_dropdown_datalists(menu) {
  // Initialize empty arrays for each component
  let ingredients = [];
  let glasses = [];
  let garnishes = [];
  let methods = [];

  for (const alcoholType in menu) {
    const cocktails = menu[alcoholType];

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