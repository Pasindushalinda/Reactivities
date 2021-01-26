import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { useHistory, useParams } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput } from '../../../common/form/TextInput';
import { TextAreaInput } from '../../../common/form/TextAreaInput';
import { SelectInput } from '../../../common/form/SelectInput';
import { category } from '../../../common/options/categoryOptions';
import { DateInput } from '../../../common/form/DateInput';
import { combineDateAndTime } from '../../../common/util/util';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

export default observer(function ActivityForm() {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const activityStore = useContext(ActivityStore);

    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity,
    } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [id, loadActivity])

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        if (!activity.id) {
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

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field component={TextAreaInput}
                                    rows={3}
                                    name='description'
                                    placeholder='Description'
                                    value={activity.description}
                                />
                                <Field component={SelectInput}
                                    options={category}
                                    name='category'
                                    placeholder='Category'
                                    value={activity.category}
                                />
                                <Form.Group widths='equal'>
                                    <Field component={DateInput}
                                        name='date'
                                        placeholder='Date'
                                        date={true}
                                        value={activity.date}
                                    />
                                    <Field component={DateInput}
                                        name='time'
                                        placeholder='Time'
                                        time={true}
                                        value={activity.time}
                                    />
                                </Form.Group>
                                <Field component={TextInput}
                                    name='city'
                                    placeholder='City'
                                    value={activity.city}
                                />
                                <Field component={TextInput}
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue}
                                />
                                <Button
                                    floated='right'
                                    positive type='submit'
                                    content='Submit'
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                />
                                <Button
                                    onClick={activity.id
                                        ? () => history.push(`/activities/${activity.id}`)
                                        : () => history.push('/activities')}
                                    floated='right'
                                    type='cancel'
                                    content='Cancel'
                                    disabled={loading}
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>

    )
})
