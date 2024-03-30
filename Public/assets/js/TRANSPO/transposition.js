function HandleMessage() {
    if (validateFormInputs()) {
        // Call your calculation function here if form inputs are valid
        // For example: calculateKeys();
    }
}

function validateFormInputs() {

    var rowInput = document.getElementById('rowInput').value;
    var columnInput = document.getElementById('columnInput').value;
    
    if (!/^[1-3]{3}$/.test(rowInput)) {
        alert("Please ensure the row key consists of exactly 3 digits between 1 and 3.");
        return false; // Return false to prevent form submission
    }
     // Additional JS validation to check for uniqueness and pattern matching
     if (!/^[1-4]{4}$/.test(columnInput)) {
        alert("Please ensure the column key consists of exactly 4 digits between 1 and 4.");
        return false; // Return false to prevent form submission
    }

    else{
        console.log("Succesful Validation");

        return true; // Return true if validation passes
    }
}
