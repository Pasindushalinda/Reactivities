import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';

interface Props extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps { }

export const SelectInput = ({ input, width, placeholder, options, meta: { touched, error } }: Props) => {
    return (
        <Form.Field error={touched && error} width={width}>
            <Select value={input.value}
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
            />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}
