const {
    getRandomPrimes,
    getn,
    oilersN,
    calculateE,
    getD,
    stringToAscii,
    asciiArrayToString,
    encrypt,
    decrypt
} = require('./rsa');

// Helper function to convert BigInts to a string for user-readable printing
function bigIntToString(value) {
    return value.toString();
}

async function testRSA() {
    console.log("Test 1: Generate random primes");
    const [p, q] = getRandomPrimes();
    console.log(`Random primes: p=${bigIntToString(p)}, q=${bigIntToString(q)}`);

    console.log("\nTest 2: Calculate n (p * q)");
    const n = getn(p, q);
    console.log(`n: ${bigIntToString(n)}`);

    console.log("\nTest 3: Calculate Euler's totient function (phi)");
    const phi = oilersN(p, q);
    console.log(`Euler's totient function (phi): ${bigIntToString(phi)}`);

    console.log("\nTest 4: Calculate e");
    const e = calculateE(phi);
    console.log(`e: ${bigIntToString(e)}`);

    console.log("\nTest 5: Calculate d");
    // Now we wait for getD to fulfill the promise before moving on
    const d = await getD(e, phi);
    console.log(`d: ${bigIntToString(d)}`);

    console.log("\nTest 6: Convert string to ASCII values");
    const message = "Hello, World!";
    const asciiValues = stringToAscii(message);
    console.log("ASCII values:", asciiValues.map(bigIntToString));

    console.log("\nTest 7: Convert ASCII values back to string");
    const originalMessage = asciiArrayToString(asciiValues);
    console.log(`Original message: ${originalMessage}`);

    console.log("\nTest 8: Encrypt message");
    const encryptedMessage = encrypt(asciiValues, e, n);
    console.log("Encrypted message:", encryptedMessage.map(bigIntToString));

    console.log("\nTest 9: Decrypt message");
    const decryptedMessage = decrypt(encryptedMessage, d, n);
    console.log(`Decrypted message: ${decryptedMessage}`);
    console.log(`d: ${bigIntToString(d)}`);
}

testRSA().catch(error => {
    console.error("An error occurred during the RSA test sequence:", error);
});
