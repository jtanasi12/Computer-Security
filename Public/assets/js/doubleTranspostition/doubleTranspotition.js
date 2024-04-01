

//takes a users string and validates that it is 12 characters long
//creates a 12 element array from the string and returns the created array
//will return null if invalid
function validateAndCreateArray(input) {
    //checking string is 12 char long
    if (input.length !== 12) {

        //returning null if not
        return null;
    }

    // Convert input string into an array of characters
    const charArray = input.split('');

    characterArray = charArray;
    // Transfer the array we are creating to a global variable

    //returning created array
    return charArray;
}


// Function to display a 3x4 matrix from an array.
function display3x4Matrix(array) {

    // Get the container element to display the table.
    const container = document.getElementById('matrix-container');

    // Create table and tbody elements.
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');

    // Loop to create 3 rows (for the 3x4 matrix).
    for (let i = 0; i < 3; i++) {

        // Create a row.
        let tr = document.createElement('tr');

        // Loop to add 4 cells in each row.
        for (let j = 0; j < 4; j++) {

            // Create a cell and set its content from the array.
            let td = document.createElement('td');

            // Access element from array.
            td.textContent = array[i * 4 + j];

            // Add cell to row.
            tr.appendChild(td);
        }

        // Add row to tbody.
        tbody.appendChild(tr);
    }
    // Add tbody to table.
    table.appendChild(tbody);

    // Display the table in the container.
    container.appendChild(table);
}


// Function that accepts row and column key strings, validates them, and creates arrays.
function validateAndCreateKeyArrays(rowKeyString, columnKeyString) {
    // Checks if rowKeyString exactly matches "123" in any order.
    function isValidRowKeyString(keyString) {
        // Sorts characters in ascending order.
        const sortedKey = keyString.split('').sort().join('');
        // Checks if sorted string matches "123".
        return sortedKey === '123';
    }

    // Checks if columnKeyString exactly matches "1234" in any order.
    function isValidColumnKeyString(keyString) {
        // Sorts characters in ascending order.
        const sortedKey = keyString.split('').sort().join('');
        // Checks if sorted string matches "1234".
        return sortedKey === '1234';
    }

    // Converts a string of numbers into an array of number type.
    function stringToArrayOfNumbers(keyString) {
        // Splits string into characters, converts each to Number.
        return keyString.split('').map(Number);
    }

    // Checks both strings for validity and converts them if they're valid.
    if (isValidRowKeyString(rowKeyString) && isValidColumnKeyString(columnKeyString)) {
        return {
            // Converts row keys string to array.
            rowKeys: stringToArrayOfNumbers(rowKeyString),
            // Converts column keys string to array.
            columnKeys: stringToArrayOfNumbers(columnKeyString)
        };
    } else {
        // If either string is invalid, returns null.
        return null;
    }
}


// Function to reorder a 12-element array based on new row order and return as a single array.
function reOrderArrayBasedonRows(dataArray, rowOrder) {

    // Initialize an empty array to hold the matrix (3 rows of 4 elements each).
    let matrix = [];

    // Loop over dataArray to create 3 rows (each a 4-element array) for the matrix.
    for (let i = 0; i < dataArray.length; i += 4) {

        // Extract a row of 4 elements and add to the matrix.
        matrix.push(dataArray.slice(i, i + 4));
    }

    // Reorder the rows of the matrix according to rowOrder.
    // Each 'order' in rowOrder is used to pick the corresponding row from 'matrix'.
    let reorderedMatrix = rowOrder.map(order =>
        // Adjust 'order' to zero-based index and fetch the corresponding row.
        matrix[order - 1]
    );

    // Flatten the reordered matrix back into a single array.
    // Return the flattened, reordered array.
    return reorderedMatrix.flat();
}


function reorderArrayBasedOnColumns(dataArray, columnOrder) {
    let reorderedArray = [];

    // Iterate over each column index specified in columnOrder.
    columnOrder.forEach((order) => {
        // Calculate the starting index of the current column.
        let columnStartIndex = (order - 1) * 3;

        // Add elements from this column to the reorderedArray.
        for (let i = 0; i < 3; i++) {
            let index = columnStartIndex + i;
            reorderedArray.push(dataArray[index]);
        }
    });

    // Return the newly ordered array.
    return reorderedArray;
}


//finding the inverse order of an array for decryption
function findInverseOrderUsingPlaceholder(encryptionOrder) {

    // Create a placeholder array of the same length as the encryptionOrder, filled with zeros.
    let inverseOrder = new Array(encryptionOrder.length).fill(0);

    // Iterate over the encryptionOrder array.
    for (let i = 0; i < encryptionOrder.length; i++) {

        // The current element in encryptionOrder is the new position in the inverse
        inverseOrder[encryptionOrder[i] - 1] = i + 1;
    }

    // Return the populated inverseOrder array, which now reflects the original positions.
    return inverseOrder;
}






// Example input
const inputString = "HelloWorld12";
const rowKeyString = "231";
const columnKeyString = "3142";

// Validate and create an array from the input string
const charArray = validateAndCreateArray(inputString);
console.log("Original Array:", charArray);

// Validate and create key arrays for rows and columns
const keys = validateAndCreateKeyArrays(rowKeyString, columnKeyString);
if (!keys) {
    console.error("Invalid keys.");

}
console.log("Row Keys:", keys.rowKeys);
console.log("Column Keys:", keys.columnKeys);

// Encrypt using row order
const firstEncryptionStepArray = reOrderArrayBasedonRows(charArray, keys.rowKeys);
console.log("After Row Reorder:", firstEncryptionStepArray);

// Encrypt using column order
const encryptedArray = reorderArrayBasedOnColumns(firstEncryptionStepArray, keys.columnKeys);
console.log("After Column Reorder (Encrypted):", encryptedArray);

// Find inverse orders for decryption
const inverseRowOrder = findInverseOrderUsingPlaceholder(keys.rowKeys);
const inverseColumnOrder = findInverseOrderUsingPlaceholder(keys.columnKeys);
console.log("Inverse Row Order:", inverseRowOrder);
console.log("Inverse Column Order:", inverseColumnOrder);

// Decrypt using inverse column order
const firstDecryptionStepArray = reorderArrayBasedOnColumns(encryptedArray, inverseColumnOrder);
console.log("After Inverse Column Reorder:", firstDecryptionStepArray);

// Decrypt using inverse row order
const decryptedArray = reOrderArrayBasedonRows(firstDecryptionStepArray, inverseRowOrder);
console.log("Decrypted Array:", decryptedArray);

// Check if decryption was successful
console.log("Decryption Successful?", JSON.stringify(charArray) === JSON.stringify(decryptedArray));