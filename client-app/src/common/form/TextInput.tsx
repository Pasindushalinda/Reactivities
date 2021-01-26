import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface Props extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps { }

export const TextInput = ({ input, width, placeholder, type, meta: { touched, error } }: Props) => {
    return (
        <Form.Field error={touched && error} type={type} width={width}>
            <input {...input} placeholder={placeholder} />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}
