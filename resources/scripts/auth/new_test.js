function new_test_callback(event){
    event.preventDefault();
    
    try {
        let menu_name = document.getElementById('menuInput').value;
        const passcode = document.getElementById("keyInput").value;

        // check menu_name valid file name
        const _FILE_NAME_REGEX = /^[a-zA-Z0-9\s\-_]+$/;
        if (!_FILE_NAME_REGEX.test(menu_name)) {throw new MenuFileError;}

        document.getElementById("main_menu").remove();
        
        handler = new editor(menu_name, passcode);
        widgets = new widgetFactory(mode);
        q = new quiz(menu, handler, widgets);
        q.start();

        if (_VERBOSE >= 2){console.log("New test interface generated")};

    } catch (error) {

        if (error instanceof MenuFileError) {
            const menuLabel = document.getElementById("menuInputLabel");
            menuLabel.textContent = "Enter Menu Name - use only letters, numbers, spaces, hyphens, and underscores";
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