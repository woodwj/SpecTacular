/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */
const MODES = Object.freeze({
    EDIT: 0,
    BAR: 1,
    FLOOR: 2
});
// main menu button onclick callback
function main_menu_callback_of(button){

    // remove all main menu buttons
    document.getElementById("mm_buttons").remove();

    // resolve handler based on the button click context
    let handler, preamble, mode;
    let menu_input_HTML = `<input type="file" id="menuInput" accept=".menu" placeholder="Required ..." required></input>`;
    
    if (button.id == "mm_take_bar"){
        mode = MODES.BAR;
        handler = take_test_callback;
        preamble = "To take a test please select a menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
    }
    else if (button.id == "mm_take_floor"){
        mode = MODES.FLOOR;
        handler = take_test_callback;
        preamble = "To take a test please select a menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
    }   
    else if (button.id == "mm_edit"){
        mode = MODES.EDIT;
        handler = edit_test_callback;
        preamble = "To edit a test please select a menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
    }
    else if (button.id == "mm_new"){
        mode = MODES.EDIT;
        handler = new_test_callback;
        preamble = "To create a test please enter a filename for the menu and a passode to acess the menu with."
        menu_input_HTML = `<input type="text" id="menuInput" placeholder="Required ..." required></input>`;
    }
    else if (button.id == "mm_json"){
        mode = MODES.EDIT;
        handler = json_convert_callback;
        preamble = "To convert a test please select a json menu file and provide its passcode. Its recommended to keep your menu files in the 'Menus' Folder.";
        menu_input_HTML = `<input type="file" id="menuInput" accept=".json" placeholder="Required ..." required></input>`;

    }
    else {console.error("Error in main menu callback context | Check Button:", button);}

    // authenticate acess for a menu file, or take credentials for a new menu
    document.getElementById("main_menu").appendChild(widgetFactory.make(
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
        callback : ["submit", (event) => handler(event, mode)]
    }
    ));
}