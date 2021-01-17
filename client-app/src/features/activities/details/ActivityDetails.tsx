import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { useParams, useHistory } from 'react-router-dom';
import LoadingComponent from '../../../app/layouts/LoadingComponent';
import ActivityDetailedHeader from '../details/ActivityDetailedHeader';
import ActivityDetailedInfo from '../details/ActivityDetailedInfo';
import ActivityDetailedChat from '../details/ActivityDetailedChat';
import ActivityDetailedSidebar from '../details/ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const activityStore = useContext(ActivityStore);
    const {
        activity,
        loadActivity,
        loadingInitials
    } = activityStore;

    useEffect(() => {
        loadActivity(id);
    }, [loadActivity, id, history])

    if (loadingInitials) return <LoadingComponent content='Loading Activity...' />

    if (!activity) return <h2>Activity not found</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>

    )
})
