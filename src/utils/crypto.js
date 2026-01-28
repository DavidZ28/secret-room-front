const encoder = new TextEncoder;
const decoder = new TextDecoder;

async function deriveKey(secret) {
    const baseKey = await crypto.subtle.importKey(
        "raw", 
        encoder.encode(secret), 
        "PBKDF2", 
        false, 
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("secret-room"),
            iterations: 100_000,
            hash: "SHA-256",
        },
        baseKey,
        {
            name: "AES-GCM",
            length: 256,
        },
        false,
        ["encrypt", "decrypt"]
    );

}

export { encoder, decoder, deriveKey };