class marker{
    mode;
    #menu;
    constructor(menu, mode) {
        this.#menu = menu;
        this.mode = mode;
    }

    getColorStyle(percentage) {
        const hue = (percentage / 100) * 120; // 0 (green) to 120 (red)
        return `hsl(${hue}, 100%, 50%)`;
    }
    // implement history marks
    //markHistory(cocktail){}

    // refactor: handle bar vs floor mode
    markIngredients(cocktail){
        let score = 0;
        const n_ingredients = Object.keys(cocktail.ingredients).length;
        // Create a dictionary to store user guesses for ingredients
        let ingredient_answers = {...cocktail.ingredients};
        for (let i = 1; i <= n_ingredients; i++) {
    
            // Store user guesses
            let ingredientG = document.getElementById(`${cocktail.name}_ingredient-${i}`).value;
    
            // Check if the ingredientName exists in cocktail.ingredients
            if (ingredient_answers.hasOwnProperty(ingredientG)) {
                document.getElementById(`${cocktail.name}_ingredient-${i}`).style.border = "2px solid green";
                let quantityAnswer = ingredient_answers[ingredientG];
                delete ingredient_answers[ingredientG];
                score++;
                if (this.mode == MODES.BAR){
                    let quantityG = document.getElementById(`${cocktail.name}_quantity-${i}`).value;
                    if (quantityG != '' && quantityAnswer == parseInt(quantityG, 10)) {
                        // The answer is correct for both ingredient and quantity;
                        document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid green";
                        score++; // Increment score for both correct ingredient and quantity
                    } else {
                        document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid red";
                    }
                }
            }
            else {
                document.getElementById(`${cocktail.name}_ingredient-${i}`).style.border = "2px solid red";
                if (this.mode == MODES.BAR){document.getElementById(`${cocktail.name}_quantity-${i}`).style.border = "2px solid red"};
            }
            
        }
        return [score, this.mode == MODES.BAR? 2*n_ingredients : n_ingredients ];
    }
    
    markGlass(cocktail){
        let score = 0;
        const glass_guess = document.getElementById(`${cocktail.name}_glass`).value;
        if (glass_guess == cocktail.glass) {
            score ++;
            document.getElementById(`${cocktail.name}_glass`).style.border = "2px solid green";
        }
        else {
            document.getElementById(`${cocktail.name}_glass`).style.border = "2px solid red";
        }
        return [score,1];
    }
    
    markGarnish(cocktail) {
        if (cocktail.hasOwnProperty("garnish") == false) {return [0,0];}
        let score = 0;
        let garnishAnswers = [...cocktail.garnish]; // Use spread operator to create a copy array
        garnishAnswers.forEach((garnish, i) => {
            let garnish_guess = document.getElementById(`${cocktail.name}_garnish-${i + 1}`).value;
            
            // Use includes() to check if the guess is in the array
            if (garnishAnswers.includes(garnish_guess)) {
                garnishAnswers = garnishAnswers.filter(answer => answer !== garnish_guess);
                score++;
                document.getElementById(`${cocktail.name}_garnish-${i + 1}`).style.border = "2px solid green";
            } else {
                document.getElementById(`${cocktail.name}_garnish-${i + 1}`).style.border = "2px solid red";
            }
        });
    
        return [score, cocktail.garnish.length];
    }
    
    markMethod(cocktail){
        let score = 0;
        const method_guess = document.getElementById(`${cocktail.name}_methods`).value;
        if (method_guess == cocktail.method) {
            score ++;
            document.getElementById(`${cocktail.name}_methods`).style.border = "2px solid green";
        }
        else {
            document.getElementById(`${cocktail.name}_methods`).style.border = "2px solid red";
        }
        return [score,1];
    };

    markHistory(cocktail){
        let score = 0;
        if (cocktail.hasOwnProperty("history") == false) {return [0,0];}
        const history_guess = document.getElementById(`${cocktail.name}_history`).value;
        if (history_guess == cocktail.history) {
            score ++;
            document.getElementById(`${cocktail.name}_history`).style.border = "2px solid green";
        }
        else {
            document.getElementById(`${cocktail.name}_history`).style.border = "2px solid red";
        }
        return [score,1];
    };

    
    
    // refactor: optional history handling
    markCocktail(cocktail) {
        let total_score = 0;
        let total_max_score = 0;
        let markers = [this.markIngredients.bind(this), this.markGlass, this.markGarnish,  this.markHistory];
        if (this.mode == MODES.BAR) {markers.push(this.markMethod);}
        for (const marker of markers) {
            const [score, max_score] = marker(cocktail);
            total_score += score;
            total_max_score += max_score;
        }
    
        if (total_score == total_max_score) {
            document.getElementById(`${cocktail.name}_title`).style.color = "green";
            return [1,1];
        } else {
            document.getElementById(`${cocktail.name}_title`).style.color = "red";
            return [0,1];
        }
        // return [total_score, total_max_score];
    }
    
    handle_submission(event) {
        event.preventDefault();
        document.getElementById("submit-test-button").remove();
        const scoreDiv = widgetFactory.make({id: "scoreArea"});
    
        let totalScore = 0;
        let totalMaxScore = 0;
    
        for (const [category, cocktail_list] of Object.entries(this.#menu)) {
            let categoryScore = 0;
            let categoryMaxScore = 0;
            cocktail_list.forEach(cocktail => {
                const [score, max_score] = this.markCocktail(cocktail);
                categoryScore += score;
                categoryMaxScore += max_score;
            });
            totalScore += categoryScore;
            totalMaxScore += categoryMaxScore;
            const percentage = Number(((categoryScore / categoryMaxScore) * 100).toFixed(0));
            scoreDiv.innerHTML += 
            `<p>${category} Score: ${categoryScore} / ${categoryMaxScore} (<span style="color: ${this.getColorStyle(percentage)}">${percentage}%</span>)</p>`;  
        }
        const percentage = Number(((totalScore / totalMaxScore) * 100).toFixed(0));
        scoreDiv.innerHTML += 
        `<hr>
        <p>Total Score: ${totalScore} / ${totalMaxScore} (<span style="color: ${this.getColorStyle(percentage)}">${percentage}%</span>)</p>`;
        document.body.appendChild(scoreDiv);
    }
}

