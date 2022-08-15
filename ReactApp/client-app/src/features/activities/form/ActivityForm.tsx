import { observer } from "mobx-react-lite";
import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as YUP from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activiy } from "../../../app/models/Activity";

export default observer(function ActivityForm(){

    const history = useNavigate();
    const{activityStore} = useStore();
    const{createActivity,updateActivity,loading,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    const [activity,setActivity] = useState<Activiy>({ 
        id: '',
        title: '',
        description: '',
        date: null
    });


    const validationSchema = YUP.object({
        title:YUP.string().required('activity title is required.'),
        description:YUP.string().required(),
        date:YUP.string().required('date is required.')

    })

    useEffect(()=>{
        if(id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id,loadActivity])

    function handleFormSubmit(activity:Activiy)
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

//   function handleItemChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
//   {
//       const{name,value} = event.target;
//       setActivity({...activity,[name]:value});
//   }

  if(loadingInitial) return <LoadingComponent content="loading activity..."></LoadingComponent>

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color="teal"></Header>
            <Formik 
            enableReinitialize
            initialValues={activity}
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}>
             {({handleSubmit,dirty,isValid,isSubmitting})=>(                
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Title' name='title'></MyTextInput> 
                    <MyTextArea rows={3} placeholder='Desription'  name='description' />            
                    <MyDateInput
                     placeholderText='Date'
                      name='date'
                      showTimeSelect
                      timeCaption='time'
                      dateFormat='MMMM d, yyyy h:mm aa'
                       />

                    <Button 
                    disabled={isSubmitting||!dirty|| !isValid}
                    floated="right" loading={loading} positive type='submit' content='Submit' />
                    <Button as={Link} to={'/activities'}  floated="right" type='button' content='Cancel'/>
                </Form>

             )}

            </Formik>
            
        </Segment>
    )
})