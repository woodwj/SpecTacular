// GLOBALS
const _VERBOSE = 2;
const _EXPIRY = new Date(2000000000000);

// main menu button onclick callback
function main_menu_callback_of(button){

    // remove all main menu buttons
    document.getElementById("mm_buttons").remove();

    // resolve handler based on the button click context
    let handler, preamble;
    let menu_input_HTML = `<input type="file" id="menuInput" accept=".menu" placeholder="Required ..." required></input>`;
    if (button.id == "mm_take"){
        handler = take_test_callback;
        preamble = "To take a test please select a menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
    }    
    else if (button.id == "mm_edit"){
        handler = edit_test_callback;
        preamble = "To edit a test please select a menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
    }
    else if (button.id == "mm_new"){
        handler = new_test_callback;
        preamble = "To create a test please enter a filename for the menu and a passode to acess the menu with."
        menuInputHTML = `<input type="text" id="menuInput" placeholder="Required ..." required></input>`;
    }
    else {console.error("Error in main menu callback context | Check Button:", button);}

    // authenticate acess for a menu file, or take credentials for a new menu
    document.getElementById("main_menu").appendChild(make_elem(
    {
        elem : "form",
        id   : "authenticateForm",
        HTML : `
        <p>${preamble}</p>
        <label for="menuInput" id="menuInputLabel">${button.id == 'mm_new' ? 'Enter Menu Name ' : 'Select Menu '}</label>
        ${menu_input_HTML}
        <label for="keyInput" id="keyInputLabel">Enter Pascode </label>
        <input type="password" id="keyInput" placeholder="Required..." required>
        <button type="submit">Submit</button>`,
        callback : ["submit", (event) => handler(event)]
    }
    ));
}

// I know this is fake, but for my purposes
if (Date.now() - _EXPIRY > 0) {

    // Out of date licence -> Alert
    document.body.appendChild(make_elem(
    {
        id   : "main_menu",
        HTML : `
        <u><h1>Trial Over</h1></u>
        <p>This trial version has expired, deadline: ${_EXPIRY.toDateString()}</p>
        <p>Contact via <a href=https://github.com/woodwj/SpecTacular>GitHub</a></p>`
    }
    ));
    if (_VERBOSE >= 1){console.log("Licence Invalid")};
    
} else {
    // License Valid -> Form for test access
    const greeting = `
    <h2>SpecTacular<img src="resources/images/MM_Icon.png" alt="SpecTacular Image"></h2>
    <p><u>Do not share passcodes codes with candidates.</u></p>
    `;
    document.body.appendChild(make_elem(
    {
        id  : "main_menu",
        HTML: `
        <div>${greeting}</div>
        <div id="mm_buttons">
            <button id="mm_take" onclick="main_menu_callback_of(this)">Take a Test</button>
            <button id="mm_edit" onclick="main_menu_callback_of(this)">Edit Menu</button>
            <button id="mm_new" onclick="main_menu_callback_of(this)">Create Menu</button>
        </div>`
    }
    ));
    if (_VERBOSE >= 1){console.log("Licence Valid");}
}