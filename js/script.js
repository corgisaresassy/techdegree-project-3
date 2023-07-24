//various variables and fields that were useful in more than one function:

let nameField = document.getElementById('name');
let emailField = document.getElementById('email');
let jobRoleOther = document.getElementById('other-job-role');
let jobRoleDropdown = document.getElementById('title');
let tshirtDesignDropdown = document.getElementById('design');
let tshirtColorDiv = document.getElementById('shirt-colors');
let activities = document.getElementById('activities');
let activitiesBox = document.getElementById('activities-box');
let paymentSelector = document.getElementById('payment');
let creditCard = document.getElementById('credit-card');
let paypal = document.getElementById('paypal');
let bitcoin = document.getElementById('bitcoin');
let masterForm = document.querySelector('form');
let totalDisplay = document.getElementById('activities-cost')
let activitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let cCField = document.getElementById('cc-num');
let cVVField = document.getElementById('cvv');
let zipField = document.getElementById('zip');

//Settinv the acitivty selector test boolean to false as, by default, no activities are selected.
// This variable is used in multiple places to determine if an activity is selected or not.
let activitySelected = false;

// Setting up initial settings, hiding elements, etc.
jobRoleOther.style.display = 'none';
tshirtColorDiv.style.display = 'none';
nameField.focus();
paymentSelector.value = 'credit-card';
bitcoin.style.display = 'none';
paypal.style.display = 'none';

// adding event listeners to change display properties

//This listener unhides the additional option to fill in a job description if other is selected

jobRoleDropdown.addEventListener('change',(e) =>{
    if (e.target.value === 'other'){
        jobRoleOther.style.display = '';
    } else {
        jobRoleOther.style.display = 'none';
    }
})

//This listener controls revealing the t-shirt color selection option once a design is selected

tshirtDesignDropdown.addEventListener('change', (e) =>{
    let colorDropdownParent = document.getElementById('color');
    let colorDropdown = document.getElementById('color').children;

    // first up we'll add the case of JS puns is selected
    if (e.target.value === 'js puns'){
        // now we'll need to reveal the color div
        tshirtColorDiv.style.display = '';
        // once the div is displayed we need to allow the presentation of only the approrpiate colors.
        // I'm using a for loop here to iterate through the options and hide all those that aren't of the appropriate option 
        for (let i =0; i<colorDropdown.length;i++){
            if(colorDropdown[i].innerHTML.includes('Puns')){
                colorDropdown[i].style.display = '';
            } else {
                colorDropdown[i].style.display = 'none';
            }
            
        }
        // Lastly we need to set the color selector value to be blank.
        colorDropdownParent.value = colorDropdown[0];
    }
    // second we'll add the case for the I <3 JS selection
    if (e.target.value === 'heart js'){
        // now we'll need to reveal the color div
        tshirtColorDiv.style.display = '';
        // once the div is displayed we need to allow the presentation of only the approrpiate colors.
        // I'm using a for loop here to iterate through the options and hide all those that aren't of the appropriate option 
        for (let i =0; i<colorDropdown.length;i++){
            if(colorDropdown[i].innerHTML.includes('I')){
                colorDropdown[i].style.display = '';
            } else {
                colorDropdown[i].style.display = 'none';
            }
            
        }
        colorDropdownParent.value = colorDropdown[0];
    }

})

//This listener looks for changes to activities and calculates and displays the new total cost

activities.addEventListener('change', (e)=>{
    let total = 0;
    let allActivities = activitiesBox.children;
    for (let i = 0;i<allActivities.length;i++){
        if (allActivities[i].children[0].checked){
            total += parseInt(allActivities[i].children[0].dataset.cost);
        }
    }
    if (total>0){
        activitySelected=true;
    } else {
        activitySelected=false;
    }
    totalDisplay.innerText = `Total: $${total}`;
})


//This listener displays only the selected payment option and hides the others
paymentSelector.addEventListener('change', (e) =>{
    if (paymentSelector.value === 'credit-card'){
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditCard.style.display = '';
    }
    if (paymentSelector.value === 'bitcoin'){
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        creditCard.style.display = 'none';
    }
    if (paymentSelector.value === 'paypal'){
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
    }
})

//this is the master form checker on submit
// This function is a bit clunky now that I've completed Extra Credit 2. Really needs some refactoring. 
// Not sure how I can keep this DRY though as the addKeyUp function doesn't have side effects which I would need to track these bools.

masterForm.addEventListener('submit', (e)=>{
    let nameBool = isValidName(nameField.value);
    let emailBool = isValidEmail(emailField.value);
    let creditCardNumBool = isValidCCNumber(document.getElementById('cc-num').value);
    let cVVBool = isValidCVV(document.getElementById('cvv').value);
    let zipBool = isValidZip(document.getElementById('zip').value);
    if (paymentSelector.value !== 'credit-card'){
        cVVBool = true;
        zipBool = true;
        creditCardNumBool = true;
    }

    if(nameBool){
        valid(nameField);
    } else {
        notValid(nameField);
    }

    if(emailBool){
        valid(emailField);
    } else {
        notValid(emailField);
    }

    if(creditCardNumBool){
        valid(document.getElementById('cc-num'));
    } else {
        notValid(document.getElementById('cc-num'));
    }

    if(cVVBool){
        valid(document.getElementById('cvv'));
    } else {
        notValid(document.getElementById('cvv'));
    }

    if(zipBool){
        valid(document.getElementById('zip'));
    } else {
        notValid(document.getElementById('zip'));
    }

    if(activitySelected){
        valid(activitiesBox);
    } else {
        notValid(activitiesBox);
    }

    if (!(nameBool&&emailBool&&activitySelected&&creditCardNumBool&&cVVBool&&zipBool)){
        e.preventDefault();
    }

})

//Here I'm going to use a for loop to apply an event listener to each of the activities checkboxes.
// This for loop adds the focus and unfocus classes to the boxes.
// I've also used this for loop toa dd event the event listener that checks for schedule conflicts.
for (let i = 0; i<activitiesCheckboxes.length; i++){
    //first we'll add the on focus event and add the .focus class
    activitiesCheckboxes[i].addEventListener('focus', (e)=>{
        e.target.parentNode.className = "focus";
    })
    activitiesCheckboxes[i].addEventListener('blur',(e)=>{
        e.target.parentNode.className = "";
    })

    // We're also going to use this for loop to add an event listener to check for time conflicts here  
    activitiesCheckboxes[i].addEventListener('change',(e)=>{
        //Goal here is to reduce time complexity by setting the date we need to check with the event and then loop through the remaining events.
        //First we're going to store the trigerring boxes date    
        let testDate = e.target.dataset.dayAndTime;
        //We're going to now trigger a for loop that the event has taken place. The loop will check two conditions:
        //1, whether there's a matching time and the originator box is checked (and not itself) if so, mark matching box as disabled
        //2 whether theres a matching time and the orignator box is unchecked. If so, it'll remove the disabled tag and unhide the box.
        for (let j =0;j<activitiesCheckboxes.length;j++){
            if(testDate===activitiesCheckboxes[j].dataset.dayAndTime&&i!==j&&e.target.checked){
                activitiesCheckboxes[j].parentNode.classList.add('disabled');
                activitiesCheckboxes[j].style.display='none';
            } else if (!e.target.checked&&testDate===activitiesCheckboxes[j].dataset.dayAndTime) {
                activitiesCheckboxes[j].parentNode.classList.remove('disabled');
                activitiesCheckboxes[j].style.display='';
            }
        }
        
    })
}

//As the keyup validation system would be the same for all field, I created a higher order function to accept the field and validation functions.
//This function utlizes those paramaters to create the keyup event listeners for each.
function addKeyUpValidation (field, validFunction){
    field.addEventListener('keyup',(e) => {
        let input = e.target.value;
        if (validFunction(input)){
            valid(field);
        } else {
            notValid(field);
        }
    })
}

//functions to validate each input are here and vary based on the required content.
let isValidName = function(string){
    return string.trim().length>0;
}

let isValidEmail = function(string){
    let regex = /^.+@.+\.\w+$/g;
    let testResult = regex.test(string);
    let errorMessage = document.getElementById('email-hint');
    // If the result of the overall test is false, we branch into the below logic that uses regex to test for specific error cases.
    // The below logic then updates the error message to give the user a relevant hint.
    if (!testResult){
        let noAtSymbolRegex = /@/g;
        let noDomainRegex =/.+\.\w+$/g;
        let noAtSymbolBool = noAtSymbolRegex.test(string);
        let noDomainBool = noDomainRegex.test(string);
        if (!noAtSymbolBool){
            errorMessage.innerText = 'Your email must include the @ symbol';
        } else if (!noDomainBool){
            errorMessage.innerText = 'Your email must include your domain such as google.com';
        } 
    }
    return testResult;
}

let isValidCCNumber = function (string){
    let regex = /^\d{13,16}$/g;
    return regex.test(string);
}

let isValidZip = function(string){
    let regex = /^\d{5}$/g;
    return regex.test(string);
}

let isValidCVV = function(string){
    let regex = /^\d{3}$/g;
    return regex.test(string);
}

// These two general functions can update any element to either the valid or not valid states.
let notValid = function (element){
    element.parentNode.classList.add('not-valid');
    element.parentNode.classList.remove('valid');
    element.parentNode.children[2].style.display='block';
}

let valid = function (element){
    element.parentNode.classList.add('valid');
    element.parentNode.classList.remove('not-valid');
    element.parentNode.children[2].style.display='none';
}

// Invocking the addKeyUp function to add this feature to each validated field.
addKeyUpValidation(nameField,isValidName);
addKeyUpValidation(emailField,isValidEmail);
addKeyUpValidation(cCField,isValidCCNumber);
addKeyUpValidation(cVVField,isValidCVV);
addKeyUpValidation(zipField,isValidZip);