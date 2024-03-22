const { modInv } = require('bigint-crypto-utils');

// Getting two primes numbers under 300 to use as p and q
// Generate two random 4-digit primes (for simplicity, a small subset of 4-digit primes is provided)
function getRandomPrimes() {
    const primes = [
        1009, 1013, 1019, 1021, 1031, 1033, 1049, 1051, 1061, 1063,
        1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129,
        1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217,
        1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289
    ];
    let indexes = Array.from({length: primes.length}, (_, i) => i);
    indexes.sort(() => 0.5 - Math.random()); // Shuffle index array
    return [primes[indexes[0]], primes[indexes[1]]]; // Return two random 4-digit primes
}

// Getting n by multiplying p and q
function getn(p, q) {
    return BigInt(p) * BigInt(q);
}

// Calculating Euler's totient function
function oilersN(p, q) {
    return BigInt((p - 1) * (q - 1));
}

// Calculating e for the public key
function calculateE(oilersN) {
    const commonE = 17n;

    if (gcd(commonE, oilersN) === 1n) {
        return commonE;
    }

    for (let e = commonE + 2n; e < oilersN; e += 2n) {
        if (gcd(e, oilersN) === 1n) {
            return e;
        }
    }

    return -1n;
}

// Function to find the greatest common divisor
function gcd(a, b) {
    // Euclidean algorithm to find GCD
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


// Function to calculate the private exponent (d) using the Extended Euclidean Algorithm
// Assuming getD is in rsa.js and modInv is synchronous
function getD(e, phi) {
    return new Promise((resolve, reject) => {
        try {
            const d = modInv(e, phi);
            resolve(d); // Resolve the promise with the value of d
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

// Converting a string to its ASCII values in an array
function stringToAscii(str) {
    let asciiValues = [];
    for (let i = 0; i < str.length; i++) {
        asciiValues.push(BigInt(str.charCodeAt(i)));
    }
    return asciiValues;
}

// Returning a string from an array of ASCII characters
function asciiArrayToString(asciiArray) {
    let string = '';
    for (let i = 0; i < asciiArray.length; i++) {
        string += String.fromCharCode(Number(asciiArray[i]));
    }
    return string;
}

// Encrypting a message using RSA
// Encrypting a message using RSA
function encrypt(asciiValues, e, N) {
    let encryptedValues = [];
    for (let i = 0; i < asciiValues.length; i++) {
        encryptedValues.push(BigInt(asciiValues[i]) ** e % N);
    }
    return encryptedValues; // Return array of BigInt
}



function decrypt(encryptedValues, d, N) {
    let decryptedAsciiValues = [];
    for (let i = 0; i < encryptedValues.length; i++) {
        let decryptedValue = BigInt(encryptedValues[i]) ** d % N;
        decryptedAsciiValues.push(decryptedValue);
    }
    return asciiArrayToString(decryptedAsciiValues);
}

module.exports = {
    getRandomPrimes,
    getn,
    oilersN,
    calculateE,
    gcd,
    getD,
    stringToAscii,
    asciiArrayToString,
    encrypt,
    decrypt
};
