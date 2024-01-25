function new_test_callback(event){
    event.preventDefault();
    
    try {
        let menu_name = document.getElementById('menuInput').value;
        const passcode = document.getElementById("keyInput").value;

        // check menu_name valid file name
        const _FILE_NAME_REGEX = /^[a-zA-Z0-9\s\-_]+$/;
        if (!_FILE_NAME_REGEX.test(menu_name)) {throw new MenuFileError;}

        document.getElementById("main_menu").remove();
        generate_quiz({},
            edit_mode = true,
            menu_name,
            passcode       
        );

        if (_VERBOSE >= 2){console.log("New test interface generated")};

    } catch (error) {

        if (error instanceof MenuFileError) {
            const menuLabel = document.getElementById("menuInputLabel");
            menuLabel.textContent += " - use only letters, numbers, spaces, hyphens, and underscores";
            menuLabel.style.color = "red";
        }
        else if (error instanceof KeyError) {
            const keyLabel = document.getElementById("keyInputLabel");
            keyLabel.textContent += "- wrong passcode please try again";
            keyLabel.style.color = "red";
        }
        
        else {throw error;}
    }   
}