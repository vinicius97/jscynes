# JSCynes - A generic form validator with Vanilla JS

This is a pilot project and if you like that you're welcome to contribute!
Follow some example of how to use that lib.

```
var validations = {
    context : "#form",
    index: [
        {
            name: 'email',
            required: true,
            type: 'email',
            message: 'Please insert a valid email',
            elements: '.email--field', //If you want to validate more than one element with the same rule, just use the same css class
            error_selector: '.email--field--error'
        },
        {
            name: 'dob',
            required: true,
            type: 'select',
            message: 'Please insert a valid date of birthday',
            elements: '.dob--field',
            error_selector: '.dob--field--error'
        },
        {
            name: 'gender',
            required: true,
            type: 'radio',
            message: 'Please choose a gender',
            elements: '.gender--field',
            error_selector: '.gender--field--error'
        }
    ]
};

var validate = new Validate(validations);
validate.init();
````

