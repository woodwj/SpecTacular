// GLOBALS
const _VERBOSE = 2

function handle_menu_selection(button){
    document.getElementById("select_take").remove();
    document.getElementById("select_edit").remove();

    if (button.id == "select_take"){
        document.getElementById("main_menu").appendChild(
            make_elem(
            {
                elem : "form",
                id   : "authenticateForm",
                HTML : `<label for="menuInput" id="menuInputLabel">Select Menu:</label>
                <input type="file" id="menuInput" accept=".txt" required>
                <label for="keyInput" id = "keyInputLabel">Enter Pascode:</label>
                <input type="password" id="keyInput" placeholder="Required..." required>
                <button type="submit">Submit</button>`,
                callback : ["submit", (event) => take_test_callback(event)]
            }
            )
        );
    } else {

    }
}

if (Date.now() - new Date(2000000000000) > 0) {
    // Out of date licence -> Alert
    if (_VERBOSE >= 1){console.log("Licence Invalid")};

    document.body.appendChild(
        make_elem(
        {
            id   : "main_menu",
            HTML : `
                    <u><h1>Trial Over</h1></u>
                    <p>This trial version has expired, deadline: ${_EXPIRY.toDateString()}</p>
                    <p>Contact via <a href=https://github.com/woodwj/SpecTacular>GitHub</a>
                    `
        })
    );
    
} else {
    // License Valid -> Form for test access
    if (_VERBOSE >= 1){console.log("Licence Valid");}

    const greeting = `
    <h2>SpecTacular<img src="resources/images/MM_Icon.png" alt="SpecTacular Image"></h2>
    <p>Choose a menu test file and enter its passcode before hitting submit.</p>
    `;

    document.body.appendChild(
        make_elem({
            id  : "main_menu",
            HTML: `
                ${greeting}
                <button id="select_take" onclick="handle_menu_selection(this)">Take a Test</button>
                <button id="select_edit" onclick="handle_menu_selection(this)">Edit Mode</button>`
        })
    );
}