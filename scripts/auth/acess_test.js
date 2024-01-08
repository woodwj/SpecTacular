async function acess_test(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    const userInput = document.getElementById("accessInput").value;
    if (userInput === "ENCRYPT") {
        // Call the encrypt.js script ENSURE answers.json in /Resources
        encrypt_download('answers.json');
    } else {
        // Call the decrypt.js script with the user's input as the key
        const decrypted_obj = await load_decrypt(userInput);
        // Remove the authentication form and generate the quiz
        document.getElementById("authenticateForm").remove();
        generate_quiz(decrypted_obj)
    }
}