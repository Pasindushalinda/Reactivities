import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (actvivity: IActivity) => void;
    editActivity: (actvivity: IActivity) => void;
    submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
    setEditMode,
    activity: initiazeFormState,
    createActivity,
    editActivity,
    submitting
}) => {

    const intializeForm = () => {
        if (initiazeFormState) {
            return initiazeFormState
        }
        else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(intializeForm);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }
    }

    const handleInputChanges = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChanges}
                    name='title'
                    placeholder='Title'
                    value={activity.title}
                />
                <Form.TextArea onChange={handleInputChanges}
                    name='description' rows={2}
                    placeholder='Description'
                    value={activity.description}
                />
                <Form.Input onChange={handleInputChanges}
                    name='category'
                    placeholder='Category'
                    value={activity.category}
                />
                <Form.Input onChange={handleInputChanges}
                    name='date'
                    type='datetime-local'
                    placeholder='Date'
                    value={activity.date}
                />
                <Form.Input onChange={handleInputChanges}
                    name='city'
                    placeholder='City'
                    value={activity.city}
                />
                <Form.Input onChange={handleInputChanges}
                    name='venue'
                    placeholder='Venue'
                    value={activity.venue}
                />
                <Button
                    floated='right'
                    positive type='submit'
                    content='Submit'
                    loading={submitting}
                />
                <Button
                    onClick={() => setEditMode(false)}
                    floated='right'
                    type='cancel'
                    content='Cancel'
                />
            </Form>
        </Segment>
    )
}

export default ActivityForm;
