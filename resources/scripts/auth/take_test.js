async function take_test_callback(event, mode)  {
    event.preventDefault();
    event.stopPropagation();
    try {
        // Attempt decrypt
        const menu = await decrypt(
            document.getElementById('menuInput').files[0],
            document.getElementById("keyInput").value
        );

        if (_VERBOSE >= 2){console.log("Menu Decrytped & Parsed")};

        // Remove the authentication form and generate the quiz
        document.getElementById("main_menu").remove();

        handler = new marker(menu, mode)
        widgets = new widgetFactory(mode)
        q = new quiz(menu, handler, widgets)
        q.start();
        if (_VERBOSE >= 1){console.log("Test interface generated")};

    } catch (error) {

        if (error instanceof MenuFileError) {
            const menuLabel = document.getElementById("menuInputLabel");
            menuLabel.textContent = "Select Menu - please provide a valid menu";
            menuLabel.style.color = "red";
        }

        else if (error instanceof KeyError) {
            const keyLabel = document.getElementById("keyInputLabel");
            keyLabel.textContent = "Enter Passcode - wrong passcode please try again";
            keyLabel.style.color = "red";
        }
        
        else {throw error;}
    }   
}