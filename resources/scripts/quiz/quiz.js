class quiz{
  #menu;
  #widgets;
  #handler;
  static init_component_datalists(menu) {

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
    
      function knuth_shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      // Initialize empty arrays for each component
      let [ingredients, glasses, garnishes, methods, history, ice] = [[], [], [], [], [], []];  
  
      for (const section in menu) {
        const cocktails = menu[section];
    
        // Iterate over each cocktail
        cocktails.forEach(cocktail => {
          // push ingredients, glass, garnish, and method to respective arrays
          ingredients.push(...Object.keys(cocktail.ingredients));
          glasses.push(cocktail.glass);
          if (cocktail.hasOwnProperty("garnish")) {garnishes.push(...cocktail.garnish);}
          if (!cocktail.method){console.log("check me",cocktail)}
          methods.push(cocktail.method);
          if (cocktail.hasOwnProperty("history")) {history.push(cocktail.history);}
          if (cocktail.hasOwnProperty("ice")) {ice.push(cocktail.ice);}
        });
      }
      // Remove duplicate values from arrays, shuffle, populate datalists and add to the document head
      for (const [id, list] of Object.entries({
        "ingredientList": ingredients,
        "glassList": glasses,
        "garnishList": garnishes,
        "methodList": methods,
        "historyList": history,
        "iceList" : ice
      })) {
        document.head.appendChild(
            make_datalist(
                id,
                knuth_shuffle(Array.from(new Set(list)))
            )
        );
      }
  }

  // Find all inputs on the DOM which are bound to a datalist via their list attribute.
  force_datalist_validation(){
    var inputs = document.querySelectorAll('input[list]');
    for (var i = 0; i < inputs.length; i++) {
      // When the value of the input changes...
      inputs[i].addEventListener('change', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      var optionFound = false,
      datalist = event.target.list;
      
      // Determine whether an option exists with the current value of the input.
      for (var j = 0; j < datalist.options.length; j++) {
        if (event.target.value == datalist.options[j].value) {
        optionFound = true;
        break;
        }
      }

      // use the setCustomValidity function of the Validation API
      // to provide an user feedback if the value does not exist in the datalist
      if (optionFound) {
        event.target.setCustomValidity('');
      } else {
        event.target.setCustomValidity('Please select a valid value.');
        event.target.value = '';
        event.target.reportValidity();
      }

      });
    }
  }

  constructor(menu, handler, widgets) {
      this.#menu = menu;
      this.#handler = handler;
      this.#widgets = widgets;
      quiz.init_component_datalists(menu);
  }
  
  start() {
      // initilise the dropdown datalists
      // form for the quiz with marker callback
      const form = widgetFactory.make(
      {
        elem : "form",
        id   : "quizForm",
        callback : ["submit", (event) => this.#handler.handle_submission(event)],
        HTML:`
        <h1>${this.#widgets.mode == MODES.BAR? "Bar" : this.#widgets.mode == MODES.FLOOR? "Floor" : "Edit"} Spec Test</h1>
        <hr>
        ${this.#widgets.mode == MODES.BAR? `<ul><li>The questions are multiple choice, make sure you select an answer from the dropdown</li><li>Quantities are either drops or mls depending on the unit used in the spec e.g "Angostura Bitters" uses whatever unit (dashes or mls) used on the spec</li><li>Method answers are the seperated steps for the drink</li><li>Hover over any dropdown to see the full text (helps with history questions)</li><li>All components of a drink must be correct for a mark</li><li>ANSWERS ARE NOT SAVED, DO NOT CLOSE THE PAGE!</li></ul>` 
        : this.#widgets.mode == MODES.FLOOR? `<ul><li>The questions are multiple choice, make sure you select an answer from the dropdown</li><li>All components of a drink must be correct for a mark</li><li>Hover over any dropdown to see the full text (helps with history questions)</li><li>ANSWERS ARE NOT SAVED, DO NOT CLOSE THE PAGE!</li></ul>` 
        : `<ul><li>Quantities should follow the unit used in the spec e.g "Angostura Bitters" uses whatever unit (dashes or mls) used on the spec</li><li>Method answers should be the seperated steps for the drink e.g "Shake, Fine Strain"</li><li>DO NOT CLOSE THE PAGE, CHANGES ARE NOT SAVED!</li></ul>`}
        <hr>
        `
      });
    
      for (const [category, cocktail_list] of Object.entries(this.#menu)) {
          form.appendChild(this.#widgets.gen_category(category,cocktail_list));
      }
      
      // peek the mode through widgets, very nearly clean, this upsets me
      if (this.#widgets.mode == MODES.EDIT) {form.appendChild(this.#widgets.add_category_button());}
      
      // Create and append the submit button to the form
      form.appendChild(this.#widgets.sumbit_button());
      // add the form to the page
      document.body.appendChild(form);
      document.body.appendChild(document.createElement("br"));
      if (this.#widgets.mode != MODES.EDIT) {this.force_datalist_validation();}
  }
}