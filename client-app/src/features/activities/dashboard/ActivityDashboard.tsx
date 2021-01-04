import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityList from '../dashboard/ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layouts/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';

export default observer(function ActivityDashboard() {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitials) return <LoadingComponent content='Loading Activities...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Loading filters</h1>
            </Grid.Column>
        </Grid>
    )
})
