Extra Credit Part 2 Details:

For this feature, as the process to add the keyup validation is the same for each field, I declared a function addKeyUpValidation within my javascript file and then called that on each field. The function takes the field and it's validator function as paramaters and uses them to create the keyup event listener and actively update validation on input.

Extra Credit Part 3 Details:

For the email field, I added in to additional tests within the isValidEmail function. Firstly, I added a regex that checks for the @ symbol. Second, I added a regex to ensure a proper domain was added. For each case, the innerText attribute of the #email-hint element is updated to display relevant error messages for each case.