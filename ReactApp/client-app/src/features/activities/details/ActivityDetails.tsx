import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent content="" />;

  return (
    <>
      <Grid>        
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
          <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
          <ActivityDetailedChat></ActivityDetailedChat>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar></ActivityDetailedSidebar>
        </Grid.Column>
      </Grid>
      <Card>
        <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button basic color='blue' as={Link} to={`/createActivity/manage/${activity.id}`} content='Edit' />
            <Button basic color='grey' as={Link} to={'/activities'} content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  )
})