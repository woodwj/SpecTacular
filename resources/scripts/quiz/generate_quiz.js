function gen_cocktail(cocktail, edit_mode = false) {
  // Wrapper for each cocktail with title
  const cocktailDiv = gen_cocktail_wrapper(cocktail.name);

  // cocktail ingredients + quantities input elements
  cocktailDiv.appendChild(gen_ingredients_input(cocktail, edit_mode));
  // cocktail glass input element
  cocktailDiv.appendChild(gen_glass_input(cocktail, edit_mode));
  // cocktail garnish input elements
  cocktailDiv.appendChild(gen_garnishes_input(cocktail, edit_mode));
  // cocktail method input element
  cocktailDiv.appendChild(gen_method_input(cocktail, edit_mode));

  // if editing a test, add a remove cocktail button
  if (edit_mode) {cocktailDiv.appendChild(gen_remove_cocktail_button(cocktail.name));}
  return cocktailDiv;
}

function generate_quiz(menu, edit_mode = false, ...credentials) {
  // initilise the dropdown datalists
  init_dropdown_datalists(menu);

  // form for the quiz with marker callback
  const form = make_elem(
  {
    elem : "form",
    id   : "quizForm",
    callback : ["submit", (event) => edit_mode? handle_edit_submisson(event, ...credentials) : handle_test_submission(event, menu)]
  }); 

  for (const [category, cocktail_list] of Object.entries(menu)) {

    // category wrapper with title
    let categoryDiv = gen_category_wrapper(category);
    
    // generate each cocktail in the category
    cocktail_list.forEach(cocktail => {categoryDiv.appendChild(gen_cocktail(cocktail, edit_mode));});

    // add cocktail button at the end of category
    if (edit_mode) {
      categoryDiv.appendChild(gen_add_cocktail_button(category));
      categoryDiv.appendChild(gen_remove_category_button(category));
    }
    form.appendChild(categoryDiv);
  }
  
  // in edititng context add category button
  if (edit_mode) {form.appendChild(gen_add_category_button());}
 
  // Create and append the submit button to the form
  form.appendChild(gen_test_sumbit_button(edit_mode));
  // add the form to the page
  document.body.appendChild(form);
}