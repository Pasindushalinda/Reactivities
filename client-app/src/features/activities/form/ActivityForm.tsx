import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initiazeFormState,
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => initiazeFormState && setActivity(initiazeFormState));
        }

        return (() => {
            clearActivity()
        })
    }, [match.params.id, loadActivity, initiazeFormState, clearActivity, activity.id.length])

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
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
                    onClick={()=>history.push('/activities')}
                    floated='right'
                    type='cancel'
                    content='Cancel'
                />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
