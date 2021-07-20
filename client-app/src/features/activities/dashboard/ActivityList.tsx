import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {Link} from 'react-router-dom';

 
export default observer (function ActivityList() {

    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;

    const [target, setTarget] = useState('');

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) 
    {
        setTarget(e.currentTarget.name);
        activityStore.deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'> 
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                            {activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'></Button>
                                <Button
                                    name={activity.id} 
                                    loading={loading && target === activity.id} 
                                    onClick={(e) => handleDeleteActivity(e, activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'>
                                    </Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})