import { observer } from "mobx-react-lite";
import { ChangeEvent,  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";


export default observer(function ActivityForm(){

    const history = useNavigate();
    const{activityStore} = useStore();
    const{createActivity,updateActivity,loading,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    const [activity,setActivity] = useState({ 
        id: '',
        title: '',
        description: '',
        date: ''
    });

    useEffect(()=>{
        if(id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id,loadActivity])

    function handleSubmit()
    {
       //activity.id?updateActivity(activity):createActivity(activity);
       if(activity.id.length===0)
       {
           let newactivity = {...activity, id:uuid()};
           createActivity(newactivity).then(()=>history(`/activities/${newactivity.id}`));
       }
       else{
        updateActivity(activity).then(()=>history(`/activities/${activity.id}`));
       }
    }
  function handleItemChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  {
      const{name,value} = event.target;
      setActivity({...activity,[name]:value});
  }

  if(loadingInitial) return <LoadingComponent content="loading activity..."></LoadingComponent>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleItemChange}/>
            <Form.TextArea placeholder='Desription' value={activity.description} name='description' onChange={handleItemChange}/>            
            <Form.Input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleItemChange}/>
            <Button floated="right" loading={loading} positive type='submit' content='Submit' />
            <Button as={Link} to={'/activities'}  floated="right" type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})