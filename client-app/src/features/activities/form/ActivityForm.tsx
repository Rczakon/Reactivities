import { observer } from 'mobx-react-lite';
import React, { useState, ChangeEvent } from 'react'
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Form, Segment, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { create } from 'domain';


export default observer( function ActivityForm() {

    const history = useHistory();
    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
        //activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <h1>Add activity</h1>
                <Form.Input placehoolder="Title"  value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placehoolder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placehoolder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placehoolder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placehoolder="City" value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placehoolder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
})