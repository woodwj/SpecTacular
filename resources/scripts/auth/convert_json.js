/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */


async function json_convert_callback(event) {
    event.preventDefault();
    try {
        const file = document.getElementById('menuInput').files[0];
        const passcode = document.getElementById("keyInput").value;

        // load json file
        const menu = JSON.parse(await file.text());

        if (_VERBOSE >= 2){console.log("Menu Loaded")};

        let file_name = file.name.replace(/\.[^/.]+$/, "")
        file_name = file_name.endsWith(".menu") ? file_name : file_name + ".menu";
        await encrypt_download(menu, file_name, passcode);
        if (_VERBOSE >= 1){console.log("Encrypted Menu & Dowloaded")};

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