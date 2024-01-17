// Custom error classes
class MenuFileError extends Error {
    constructor(message) {
        super(message);
        this.name = "MenuFileError";
    }
}

class KeyError extends Error {
    constructor(message) {
        super(message);
        this.name = "KeyError";
    }
}

async function loadEncryptedBuffer(menuInput) {
    try{
        const fileReader = new FileReader();
        return new Uint8Array(await new Promise((resolve) => {
            fileReader.onload = (event) => resolve(event.target.result);
            fileReader.readAsArrayBuffer(menuInput);
        }));
    } catch(error) {
        throw new MenuFileError("Unable to load menu file");
    }
}

async function decrypt(menuInput, guess) {
    try{

        const encryptedBuffer = await loadEncryptedBuffer(menuInput);
        if (_VERBOSE >= 3){console.log("Loaded menu buffer");}
        const [iv, salt, encryptedData] = [
            encryptedBuffer.slice(0, 12),
            encryptedBuffer.slice(12, 28),
            encryptedBuffer.slice(28)
        ];
        if (!iv || !salt || !encryptedData) {
            throw new MenuFileError("Failed to process menu iv, salt and data");
        }

        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(guess),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 1000,
                hash: { name: "SHA-256" },
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );

        const decryptedData = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            derivedKey,
            encryptedData
        );
        if (_VERBOSE >= 3){console.log("Menu Decrypted!");}
        return JSON.parse(new TextDecoder().decode(decryptedData));

    }
    catch(error)
    {
        if(error instanceof DOMException){throw new KeyError("Failed to decrypt with guess "+ guess);}
        throw error;
    }
}