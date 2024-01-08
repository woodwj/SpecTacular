function make_div(id = null, cls = null){
  let div = document.createElement("div");
  if (id)  {div.id = id;}
  if (cls) {div.classList.add(cls);}
  return div
}

function generate_quiz(JSONObject) {

  const { ingredientDatalist, glassDatalist, garnishDatalist, methodDatalist } = extract_component_datalists(JSONObject);
  
  const form = document.createElement("form");
  form.id = "quizForm";
  form.addEventListener("submit", (event) => handleQuizSubmission(event, JSONObject));

  for (const [category, cocktail_list] of Object.entries(JSONObject)) {
    let categoryDiv = make_div(`${category}_questions`, "question-section");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);
    // Iterate over each cocktail in the current category
    cocktail_list.forEach(cocktail => {
      // Create a div to wrap each cocktail's input fields
      const cocktailDiv = make_div(`${cocktail.name}_question`, "question");

      // Create a heading element for the cocktail title
      const titleElement = document.createElement("h3");
      titleElement.id = `${cocktail.name}_title`;
      titleElement.textContent = cocktail.name;
      cocktailDiv.appendChild(titleElement);

      const ingredientDiv = ingredients_element(cocktail.name, ingredientDatalist, cocktail.ingredients);
      cocktailDiv.appendChild(ingredientDiv);

      const glassDiv = document.createElement("div");
      const glassInput = input_dropdown(`${cocktail.name}_glass`, glassDatalist);
      const glassLabel = label_element_for("Glass:", `${cocktail.name}_glasses`);
      glassDiv.appendChild(glassLabel);
      glassDiv.appendChild(glassInput);
      cocktailDiv.appendChild(glassDiv);

      const garnishDiv = garnishes_element(cocktail.name, garnishDatalist, cocktail.garnish);
      cocktailDiv.appendChild(garnishDiv);

      const methodDiv = document.createElement("div");
      const methodInput = input_dropdown(`${cocktail.name}_methods`, methodDatalist);
      const methodLabel = label_element_for("Method:", `${cocktail.name}_methods`);
      methodDiv.appendChild(methodLabel);
      methodDiv.appendChild(methodInput);
      cocktailDiv.appendChild(methodDiv);
      categoryDiv.appendChild(cocktailDiv);
    });
    form.appendChild(categoryDiv);
  }
  // Create and append the submit button
  const submitButton = document.createElement("button");
  submitButton.id = "sumbit-test-button"
  submitButton.type = "submit";
  submitButton.textContent = "Submit Answers";
  form.appendChild(submitButton);
  document.getElementById("quizArea").appendChild(form);
  console.log("Question form generated successfully");
}