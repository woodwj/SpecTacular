async function take_test_callback(event) {
    event.preventDefault();
    if (_VERBOSE >= 2){console.log("Starting Test");}

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

        if (_VERBOSE >= 1){console.log("Test Started")};

    } catch (error) {
        if (_VERBOSE >= 1){console.error("Error starting test: "+error);}

        if (error instanceof MenuFileError) {
            document.getElementById("keyInputLabel").textContent = "Error - please provide a valid menu";
            document.getElementById("keyInputLabel").style.color = "red";
        }

        else if (error instanceof KeyError) {
            document.getElementById("keyInputLabel").textContent = "Error - wrong passcode please try again";
            document.getElementById("keyInputLabel").style.color = "red";
        }
        
        else {throw error;}
    }   
}