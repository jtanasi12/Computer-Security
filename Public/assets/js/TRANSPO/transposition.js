// Global Variables
let characterArray, keys, encryptedRow, encryptedColumn,
firstDecryptionStepArray, inverseRowOrder, inverseColumnOrder,
tempColumnTable;

function Step6(tableName){

    const decryptedArray = ReorderRows(firstDecryptionStepArray, inverseRowOrder);
    display3x4Matrix(decryptedArray, tableName);
}

function Step5(tableName){
     inverseRowOrder = FindInverseOrderUsingPlaceholder(keys.rowKeys);

     inverseColumnOrder = FindInverseOrderUsingPlaceholder(keys.columnKeys);

    console.log("Inverse Row Order:", inverseRowOrder);
    console.log("Inverse Column Order:", inverseColumnOrder);

    firstDecryptionStepArray = ReorderColumns(encryptedColumn, inverseColumnOrder);

    display3x4Matrix(firstDecryptionStepArray, tableName);
}


//finding the inverse order of an array for decryption
function FindInverseOrderUsingPlaceholder(encryptionOrder) {

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

function Step4(tableName){
    encryptedColumn = ReorderColumns(encryptedRow, keys.columnKeys);

    console.log("After Row Reorder:", encryptedColumn);

    // This is for displaying the columns permutation
    tempColumnTable = EncryptColumns(encryptedRow, keys.columnKeys);
    // Display the permutation for the columns
    display3x4MatrixCOL(tempColumnTable, tableName);
}

// Encryption 
function Step3(tableName){
    encryptedRow = ReorderRows(characterArray, keys.rowKeys);

    console.log("After Row Reorder:", encryptedRow);

    display3x4Matrix(encryptedRow, tableName);
    
}

// Function to reorder a 12-element array based on new row order and return as a single array.
function ReorderRows(dataArray, rowOrder) {

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

function ReorderColumns(dataArray, columnOrder) {
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
//takes a users string and validates that it is 12 characters long
//creates a 12 element array from the string and returns the created array
//will return null if invalid
function ValidateAndCreateArray(tableName) {

    let input = document.getElementById("messageTextBox1").value;
    //checking string is 12 char long
    if (input.length !== 12) {

        alert("Your plain text must be twelve characters long");
        console.log("Incomplete entry");
    }
    else{

    // Convert input string into an array of characters
    const charArray = input.split('');

    characterArray = charArray;
    // Transfer the array we are creating to a global variable

    console.log("Successful entry");

    display3x4Matrix(characterArray, tableName);

    }


}


// Function to display a 3x4 matrix from an array.
function display3x4Matrix(array, tableName) {

    // Get the container element to display the table.
    const container = document.getElementById(tableName);

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

            // Add border styling to the cell.
            td.style.border = '1px solid black';

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

function display3x4MatrixCOL(array, tableName) {

    // Get the container element to display the table.
    const container = document.getElementById(tableName);

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
            td.textContent = array[i + j * 3]; // Access elements row-wise

            // Add border styling to the cell.
            td.style.border = '1px solid black';

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

function HandleKeys() {

    var rowInput = document.getElementById('rowInput').value;
    var columnInput = document.getElementById('columnInput').value;

    // Checks to make sure that row and column inputs fit the criteria 
    // Row Input: has to be 3 characters long, within the range of 1-3 
    // Column Input: has to be 4 characters long, within the range of 1-4
    if (ValidateFormInputs(rowInput, columnInput)) {

        // After the row and column inputs are validated, we create the array 
        CreateKeyArrays(rowInput, columnInput);
    }
}

function EncryptColumns(dataArray, columnOrder) {
    let reorderedArray = [];

    // Iterate over each column index specified in columnOrder.
    columnOrder.forEach((order) => {
        // Calculate the starting index of the current column.
        let columnStartIndex = (order - 1);

        // Add elements from this column to the reorderedArray.
        for (let i = 0; i < 3; i++) {
            let index = i * 4 + columnStartIndex;
            reorderedArray.push(dataArray[index]);
        }
    });

    // Return the newly ordered array.
    return reorderedArray;
}


// Function that accepts row and column key strings and creates arrays.
function CreateKeyArrays(rowInput, columnInput) {
         
    // Create an object with two properties that each carry an array of numbers 
    // obtained by converting the respective key strings 
    keys = {
        rowKeys: StringToArrayOfNumbers(rowInput),

        columnKeys: StringToArrayOfNumbers(columnInput)
    };

    console.log("Row Keys: " + keys.rowKeys);
    console.log("Column Keys: " + keys.columnKeys);
}

    // Converts a string of numbers into an array of number type.
    function StringToArrayOfNumbers(keyString) {
        // Splits string into characters, converts each to Number.
        return keyString.split('').map(Number);
    }


function ValidateFormInputs(rowInput, columnInput) {

    if (!/^[1-3]{3}$/.test(rowInput)) {
        alert("Please ensure the row key consists of exactly 3 digits between 1 and 3.");
        return false; // Return false to prevent form submission
    }
     // Additional JS validation to check for uniqueness and pattern matching
     if (!/^[1-4]{4}$/.test(columnInput)) {
        alert("Please ensure the column key consists of exactly 4 digits between 1 and 4.");
        return false; // Return false to prevent form submission
    }

    // Make sure that the numers don't repeat they must be unique 
    if (!isUnique(rowInput) || !isUnique(columnInput)) {
        alert("Please ensure that each number is unique in both row and column keys.");
        return false; // Return false to prevent form submission
    }

    else{
        console.log("Succesful Validation");

        return true; // Return true if validation passes
    }
}

// Makes sure that the numbers are unique
function isUnique(input) {
    var seen = {}; // Object to store seen characters
    for (var i = 0; i < input.length; i++) {
        var char = input[i];
        if (seen[char]) {
            return false; // If character is already seen, return false
        }
        seen[char] = true; // Mark character as seen
    }
    return true; // All characters are unique
}