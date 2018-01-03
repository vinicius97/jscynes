function Validate(rules) {

    var util = {

        getElements 	: function(context , selector){

            return document.querySelectorAll(context+" "+selector);

        },

        checkEmail    	: function (element){

            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(element.value);

        },

        isEmpty        : function (element){

            if(element.value === null || element.value === undefined || element.value === ''){
                return true;
            }else{
                return false;
            }

        },

        isChecked		: function(element){

            var element_checked = false;

            if(element.checked == true) {
                element_checked = true;
            }

            return element_checked;

        },

        checkForErrors  : function (validated_elements) {

            var errors = false;
            var not_errors_count = 0;
            var elements_type = '';

            for(var index = 0; index < validated_elements.length; index++){

                var element = validated_elements[index];
                elements_type = element.element_type;
                if(element.error){
                    errors = true;
                }else{
                    not_errors_count++;
                }
            }

            if(elements_type === 'radio'){
                if(not_errors_count > 0){
                    errors = false;
                }
            }

            return errors;

        }

    };

    var methods = {

        validateFields : function(rules){

            var validation_errors = [];

            for(var index = 0; index < rules.index.length; index++){

                var field = rules.index[index];
                
                var elements = util.getElements(rules.context , field.elements);

                if(elements.length){

                    var validated_elements = methods.validateElements(elements, field.name, field.type);
                    validation_errors.push(validated_elements);


                }else{

                    console.log('Elemento não encontrado');

                }

            }

            methods.setMessages(validation_errors);

            console.log(validation_errors);

        },

        setMessages : function(validations){

            for(var index = 0; index < validations.length; index++){

                var field = rules.index[index];

                var validated_elements = validations[index];

                if(util.checkForErrors(validated_elements))
                    methods.addErrorMessage(field);
                else
                    methods.removeErrorMessage(field);

            }
        },

        validateElements : function(elements, name, type){

            var errors = [];

            for(var index = 0; index < elements.length; index++){
               
                var element = elements[index];

                var validate = methods.validateByType(element, name, type);
                errors.push(validate);

            }

            return errors;

        },

        validateByType : function(element, name, type){

            var message_error = {};
            message_error.element_type = type;
            message_error.error = false;
            message_error.name = name;

            switch(type){

                case 'text':

                    if(util.isEmpty(element))
                        message_error.error = true;
                    else
                        message_error.error = false;

                    break;
                case 'email':

                    if(util.checkEmail(element))
                        message_error.error = false;
                    else
                        message_error.error = true;

                    break;
                case 'select':
                    if(util.isEmpty(element))
                        message_error.error = true;
                    else
                        message_error.error = false;

                    break;
                case 'radio':
                    if(util.isChecked(element))
                        message_error.error = false;
                    else
                        message_error.error = true;

                    break;
                default:
                    break;

            }

            return message_error;

        },

        addErrorMessage : function (field) {

            var error_containers = util.getElements(rules.context, field.error_selector);
            for(var index = 0; index < error_containers.length; index++) {

                var error_container = error_containers[index];
                error_container.innerHTML = field.message;

            }

        },

        removeErrorMessage : function (field) {

            var error_containers = util.getElements(rules.context, field.error_selector);
            for(var index = 0; index < error_containers.length; index++) {

                var error_container = error_containers[index];
                error_container.innerHTML = '';

            }

        }


    };
    this.rules = rules;

    this.init = function (){

        methods.validateFields(this.rules);

    }

}

