function gen_cocktail_wrapper(cocktail_name){
    return make_elem({
        id : `${cocktail_name}_question`,
        cls: "question",
        HTML: `<h3>${cocktail_name}</h3>`
    });
}

function gen_category_wrapper(category_name){
    return make_elem({
        id : `${category_name}_questions`,
        cls: "question-section",
        HTML: `<h2>${category_name}</h2>`
    });
}

function gen_remove_category_button(category_name){
    return make_elem({
        elem : "button",
        id : `${category_name}_remove`,
        textContent: "Remove Category",
        type : "button",
        callback : ["click", (_) => document.getElementById(`${category_name}_questions`).remove()]
    });
}

function gen_add_category_button(){
    return make_elem({
        elem : "button",
        id : "add_category_button",
        textContent: "Add Category",
        type : "button",
        callback : ["click", (_) => handle_new_category()]
    });
}

function gen_remove_cocktail_button(cocktail_name){
    return make_elem({
        elem : "button",
        id : `${cocktail_name}_remove`,
        textContent: "Remove Cocktail",
        type : "button",
        callback : ["click", (_) => document.getElementById(`${cocktail_name}_question`).remove()]
    });
}

function gen_add_cocktail_button(category_name){
    return make_elem({
        elem : "button",
        id : `${category_name}_add`,
        textContent: "New Cocktail",
        type : "button",
        callback : ["click", (_) => handle_new_cocktail(category_name)]
    });
}

function gen_test_sumbit_button(edit_mode){
    return make_elem({
        elem : "button",
        id : "sumbit-edit-button",
        type: "sumbit",
        textContent : edit_mode? "Submit Changes" : "Sumbit Test",
    });
}

