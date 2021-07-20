import { observer } from 'mobx-react-lite';
import React, { useState, ChangeEvent } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity, loading} = activityStore

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

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
                <Button floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
})