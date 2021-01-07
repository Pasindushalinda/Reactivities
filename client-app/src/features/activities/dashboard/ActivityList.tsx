import React, { Fragment, useContext } from 'react'
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityListItem from '../dashboard/ActivityListItem';

export default observer(function ActivityList() {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Fragment>
                        <Item.Group divided>
                            {activities.map((activity) => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Fragment>
                </Fragment>
            ))}
        </Fragment>
    )
})
