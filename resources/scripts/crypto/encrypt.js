/*
 * This software is licensed under the SpecTacular (William Wood Software) Trail Software License.
 * See the LICENSE file for details.
 * This license will terminate on September 1st.
 */
async function encrypt_data(jsonString, passcode) {
    // Derive a key from the passphrase using PBKDF2
    const passphrase = new TextEncoder().encode(passcode);
    const salt = crypto.getRandomValues(new Uint8Array(16)); // Generate a random salt
    const iterations = 1000; // Number of iterations based on security requirements
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Fresh rand init vec

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passphrase,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: iterations,
            hash: { name: "SHA-256" },
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    
    const dataBuffer = new TextEncoder().encode(jsonString);

    // perform AES-GCM encryption
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        derivedKey,
        dataBuffer
    );

    // Concatenate the IV, salt, and the encrypted data
    const ivSaltAndEncrypted = new Uint8Array(iv.length + salt.length + encryptedData.byteLength);
    ivSaltAndEncrypted.set(iv); // Set IV at the beginning
    ivSaltAndEncrypted.set(salt, iv.length); // Set salt after the IV
    ivSaltAndEncrypted.set(new Uint8Array(encryptedData), iv.length + salt.length); // Set encrypted data after the salt
    return ivSaltAndEncrypted;
}

async function download_data(encryptedBuffer, menu_name){
    // Create a Blob with the concatenated data
    const blob = new Blob([encryptedBuffer], { type: 'application/octet-stream' });
    
    // Setup and execute download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = menu_name;
    link.click();   
}

async function encrypt_download(JSONData, menu_name, passcode) {
    try {
        const JSONString = JSON.stringify(JSONData);
        console.log(JSONString);

        // ENCRYPT
        const post_process = await encrypt_data(JSONString, passcode);
        console.log("Data encrypted successfully");

        // SAVE
        download_data(post_process, menu_name);
        console.log("Encryption downloaded successfully");

    } catch (error) {
        console.error('Encryption & Download failed:', error);
        throw error;
    }
}