import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

interface Props extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps { }

export const DateInput = ({ input,
    id,
    date = false,
    time = false,
    width,
    placeholder,
    meta: { touched, error },
    ...rest
}: Props) => {
    return (
        <Form.Field error={touched && error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                date={date}
                time={time}
                value={input.value || null}
                onChange={input.onChange}
                onBlur={input.onBlur}
                onKeyDown={(e)=>e.preventDefault()}
                {...rest}
            />
            {touched && error && (<Label basic color='red'>{error}</Label>)}
        </Form.Field>
    )
}
