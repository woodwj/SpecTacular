async function take_test_callback(event) {
    event.preventDefault();
    try {
        // Attempt decrypt
        const menu = await decrypt(
            document.getElementById('menuInput').files[0],
            document.getElementById("keyInput").value
        );

        if (_VERBOSE >= 2){console.log("Menu Decrytped & Parsed")};

        // Remove the authentication form and generate the quiz
        document.getElementById("main_menu").remove();
        generate_quiz(menu);

        if (_VERBOSE >= 1){console.log("Test interface generated")};

    } catch (error) {

        if (error instanceof MenuFileError) {
            const menuLabel = document.getElementById("menuInputLabel");
            menuLabel.textContent += "- please provide a valid menu";
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