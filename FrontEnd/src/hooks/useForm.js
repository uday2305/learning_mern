import { useState } from 'react';

export function useForm({ validations, initialValues = {} }) {
    if (!validations) {
        throw new Error('the option `validations` is required');
    }

    if (typeof validations !== 'object') {
        throw new Error('the option `validations` should be an object');
    }
    if (typeof initialValues !== 'object') {
        throw new Error('the option `initialValues` should be an object');
    }
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    function validateField(name, value) {
        // get the validation rules for the field
        const rules = validations[name];

        // check if the rules exist, since a field can not have validations
        if (rules) {
            // if the required rule is registered
            if (rules.required?.value) {
                // now we validate the value checking if it has a value
                // we are using trim, to strip whitespaces before and after the value
                if (!value || value.toString().trim().length === 0) {
                    return typeof rules.required?.message === 'string' ? rules.required.message : 'required';
                }
            }

            // if the pattern rule is registered
            if (rules.pattern) {
                // we execute the regex
                if (!new RegExp(rules.pattern.value).exec(value)) {
                    // if the value does not match with the regex pattern, we try to return
                    // the custom message and fallback to the default message in case
                    return rules.pattern.message || 'invalid';
                }
            }
            if (rules.custom) {
                // if it has a validation function and its type is a function
                if (rules.custom.validate && typeof rules.custom.validate === 'function') {
                    // we run the validate function with the field value
                    const error = !rules.custom.validate(value);

                    // if an error message was returned, we return it
                    if (error) {
                        return rules.custom.message || 'invalid';
                    }
                }
            }
        }

        // if there are no erros, we return an empty string
        return '';
    }

    function bindField(name) {
        if (!name) {
            throw new Error('The field name parameter is required');
        }

        if (name && typeof name !== 'string') {
            throw new Error('The field name should be a string');
        }

        return {
            value: values[name] || '',
            onChange: (e) => {
                const { value } = e.target;

                setValues(state => ({
                    ...state,
                    [name]: value,
                }));
                //reseting  the error state on change
                setErrors(state => ({
                    ...state,
                    [name]: '',
                }));
            },
        }
    }

    function isValid() {
        Object.keys(validations).forEach(name =>
            setErrors(state => ({
                ...state,
                [name]: validateField(name, values[name]),
            }))
        );

        let hasError = Object.keys(validations).some(name =>
            Boolean(validateField(name, values[name]))
        );
        return !hasError;
    }

    return {
        values,
        errors,
        setErrors,
        validateField,
        bindField,
        isValid,
    };
}