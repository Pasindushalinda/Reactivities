import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface Props extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps { }

export const TextAreaInput = ({ input, width, placeholder, rows, meta: { touched, error } }: Props) => {
    return (
        <Form.Field error={touched && error} width={width}>
            <textarea rows={rows} {...input} placeholder={placeholder} />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}
