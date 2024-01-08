const _FPATH = 'encrypted_answers.txt';

async function load_encrypted_buffer(fpath) {
    const response = await fetch(fpath);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

async function decrypt_data(encryptedBuffer, guess) {

    const passphrase = new TextEncoder().encode(guess);

    // Extract the salt from the concatenated value
    const salt = encryptedBuffer.slice(12, 28); // salt length is 16 bytes
    const iv = encryptedBuffer.slice(0, 12);
    const encryptedData = encryptedBuffer.slice(28);

    const iterations = 1000;

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
    
    console.log("Attempting Decrypt");
    // Decrypt the data using AES-GCM
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        derivedKey,
        encryptedData
    );

    // Convert the decrypted data to a string
    const decryptedString = new TextDecoder().decode(decryptedData);

    return decryptedString;
}

async function load_decrypt(guess) {
    try {
        const encryptedBuffer = await load_encrypted_buffer(_FPATH);
        console.log('Fetch succeeded');
        const decryptedString = await decrypt_data(encryptedBuffer, guess);
        console.log('Decryption succeeded');

        try{
            payload = JSON.parse(decryptedString);
            console.log("Payload decryped successfully");
            return payload;
        }
        catch (parseError){
            throw new Error('Critical Error; passcode '+ guess +' decrypted unparsable data');
        }

    } catch (error) {
        console.error('Decryption & Loading failed:', error);
        alert('WRONG KEY: Please re-enter the access key and submit.');
        throw error;
    }
}