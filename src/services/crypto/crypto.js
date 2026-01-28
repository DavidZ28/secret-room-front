export function bufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

export function base64ToBuffer(base64){
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function encryptMessage(message, key) {
    const encoded = new TextEncoder().encode(message);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoded
    );
    return {
        ciphertext: bufferToBase64(ciphertext),
        iv: bufferToBase64(iv)
    };
}

export async function decryptMessage(ciphertext, iv, key) {
    const encryptedBuffer = base64ToBuffer(ciphertext);
    const initializationVector = base64ToBuffer(iv);

    const decrypted = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: initializationVector.buffer
        },
        key,
        encryptedBuffer.buffer
    );

    return new TextDecoder().decode(decrypted);
}