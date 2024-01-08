const _PASSPHRASE = "?????"
const _PT_FPATH = "answers.json"
const _EN_FNAME = "encrypted_answers.txt"

async function fetch_JSON() {
    // Fetch stringified data from the plaintext answers.json file
    const response = await fetch(_PT_FPATH);
    const JSONData = await response.json();
    return JSON.stringify(JSONData);
}

async function encrypt_data(jsonString) {
    // Derive a key from the passphrase using PBKDF2
    const passphrase = new TextEncoder().encode(_PASSPHRASE);
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

async function download_data(encryptedBuffer){
    // Create a Blob with the concatenated data
    const blob = new Blob([encryptedBuffer], { type: 'application/octet-stream' });
    
    // Setup and execute download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = _EN_FNAME;
    link.click();   
}

async function encrypt_download() {
    try {
        // FETCH
        const JSONString = await fetch_JSON();
        console.log("JSON fetched from "+_PT_FPATH)

        // ENCRYPT
        const post_process = await encrypt_data(JSONString);
        console.log("Data encrypted successfully")

        // SAVE
        download_data(post_process);
        console.log("Encryption downloaded successfully")

    } catch (error) {
        console.error('Encryption & Download failed:', error);
        throw error;
    }
}