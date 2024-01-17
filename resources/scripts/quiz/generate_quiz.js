function generate_quiz(menu) {

  // initilise the dropdown datalists
  init_dropdown_datalists(menu);

  // form for the quiz with marker callback
  const form = make_elem(
    {
      elem : "form",
      id   : "quizForm",
      callback : ["submit", (event) => handleQuizSubmission(event, menu)]
    }
  );

  for (const [category, cocktail_list] of Object.entries(menu)) {

    // Wrapper for each section with title
    let sectionDiv = make_elem({
      id : `${category}_questions`,
      cls: "question-section",
    });
    sectionDiv.appendChild(make_elem({
      elem : "h2",
      textContent: category
    }));
    
    cocktail_list.forEach(cocktail => {
      // Wrapper for each cocktail with title
      const cocktailDiv = make_elem({
        id : `${cocktail.name}_question`,
        cls: "question"
      });
      cocktailDiv.appendChild(make_elem({
        elem : "h3",
        id : `${cocktail.name}_title`,
        textContent: cocktail.name
      }));

      // cocktail ingredients + quantities input elements
      cocktailDiv.appendChild(ingredients_element(cocktail.name, cocktail.ingredients));

      // cocktail glass input element
      cocktailDiv.appendChild(make_elem({
        HTML : `
        <label for="${cocktail.name}_glasses">Glass:</label>
        <input id = "${cocktail.name}_glass" list = glassList></input>`
      }));

      // cocktail garnish input elements
      cocktailDiv.appendChild(garnishes_element(cocktail.name, cocktail.garnish));

      // cocktail method input element
      cocktailDiv.appendChild(make_elem({
        HTML : `
        <label for="${cocktail.name}_methods">Method:</label>
        <input id = "${cocktail.name}_methods" list = methodList></input>
        `
      }));
      sectionDiv.appendChild(cocktailDiv);
    });
    form.appendChild(sectionDiv);
  }
  // Create and append the submit button to the form
  form.appendChild(make_elem({
    elem : "button",
    id : "sumbit-test-button",
    type: "sumbit",
    textContent : "Sumbit Test"
  }));
  // add the form to the page
  document.body.appendChild(form);
  console.log("Question form generated successfully");
}