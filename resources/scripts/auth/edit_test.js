/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */
async function edit_test_callback(event, mode) {
    event.preventDefault();
    try {
        const file = document.getElementById('menuInput').files[0];
        const passcode = document.getElementById("keyInput").value;
        // Attempt decrypt
        const menu = await decrypt(file,passcode);

        if (_VERBOSE >= 2){console.log("Menu Decrytped & Parsed")};

        // Remove the authentication form and generate the quiz
        document.getElementById("main_menu").remove();

        handler = new editor(file.name, passcode);
        widgets = new widgetFactory(mode);
        q = new quiz(menu, handler, widgets);
        q.start();

        if (_VERBOSE >= 1){console.log("Edit test interface generated")};

    } catch (error) {

        if (error instanceof MenuFileError) {
            const menuLabel = document.getElementById("menuInputLabel");
            menuLabel.textContent = "Select Menu - please provide a valid menu";
            menuLabel.document.getElementById("InputLabel").style.color = "red";
        }
        else if (error instanceof KeyError) {
            const keyLabel = document.getElementById("keyInputLabel");
            keyLabel.textContent = "Enter Passcode - wrong passcode please try again";
            keyLabel.style.color = "red";
        }
        
        else {throw error;}
    }   
}