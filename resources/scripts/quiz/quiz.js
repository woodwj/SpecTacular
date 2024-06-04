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
      let [ingredients, glasses, garnishes, methods, history] = [[], [], [], [], []];  
  
      for (const section in menu) {
        const cocktails = menu[section];
    
        // Iterate over each cocktail
        cocktails.forEach(cocktail => {
          // push ingredients, glass, garnish, and method to respective arrays
          ingredients.push(...Object.keys(cocktail.ingredients));
          glasses.push(cocktail.glass);
          if (cocktail.hasOwnProperty("garnish")) {garnishes.push(...cocktail.garnish);}
          methods.push(cocktail.method);
          if (cocktail.hasOwnProperty("history")) {history.push(cocktail.history);}
        });
      }
      // Remove duplicate values from arrays, shuffle, populate datalists and add to the document head
      for (const [id, list] of Object.entries({
        "ingredientList": ingredients,
        "glassList": glasses,
        "garnishList": garnishes,
        "methodList": methods,
        "historyList": history
      })) {
        document.head.appendChild(
            make_datalist(
                id,
                knuth_shuffle(Array.from(new Set(list)))
            )
        );
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
        callback : ["submit", (event) => this.#handler.handle_submission(event)]
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
  }
}