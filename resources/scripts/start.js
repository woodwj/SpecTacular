// GLOBALS
const _EXPIRY = new Date(1725148861000);
const _VERBOSE = 2;

// check if licence is valid
if (Date.now() - _EXPIRY > 0) {

    // Out of date licence -> Alert
    document.body.appendChild(widgetFactory.make(
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
    <p><u>Do not share passcodes with candidates.</u></p>
    `;
    document.body.appendChild(widgetFactory.make(
    {
        id  : "main_menu",
        HTML: `
        <div>${greeting}</div>
        <div id="mm_buttons">
            <button id="mm_take_bar" onclick="main_menu_callback_of(this)">Bar Test</button>
            <button id="mm_take_floor" onclick="main_menu_callback_of(this)">Floor Test</button>
        </div>`
    }
    ));
    if (_VERBOSE >= 1){console.log("Licence Valid");}
}