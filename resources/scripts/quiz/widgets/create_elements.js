function make_elem(attrs) {
    let elem = document.createElement(attrs.elem || "div");

    for (const [key, value] of Object.entries(attrs)) {
        if (key == "id")            {elem.id = value;}
        else if (key == "cls")      {elem.classList.add(value);}
        else if (key == "HTML")     {elem.innerHTML = value;}
        else if (key == "callback") {elem.addEventListener(...value);}
        else if (key == "textContent") {elem.textContent = value;}
        else if (key == "type")     {elem.type = value;}
    }

    return elem;
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