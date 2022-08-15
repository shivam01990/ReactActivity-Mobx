import { format } from "date-fns";
import React, { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { Button, Icon, Item, Segment, SegmentGroup } from "semantic-ui-react"
import { Activiy } from "../../../app/models/Activity"
import { useStore } from "../../../app/stores/store";

interface prop {
    activity: Activiy;
}

export default function ActivityListItem({ activity }: prop) {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;

    function handledeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <SegmentGroup>
            <Segment>
                <Item.Group>
                    <Item key={activity.id}>
                        <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                        
                           
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span><Icon name="clock"></Icon>
                    {format(activity.date!, 'dd MMM yyyy h:mm aa')}</span>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button floated='right' as={NavLink} to={`/activities/${activity.id}`} content='View' color="blue"></Button>
                                <Button floated='right' name={activity.id} onClick={(e) => handledeleteActivity(e, activity.id)}
                                    loading={loading && target === activity.id} content='Delete' color="red"></Button>
            </Segment>

        </SegmentGroup>
    )
} 