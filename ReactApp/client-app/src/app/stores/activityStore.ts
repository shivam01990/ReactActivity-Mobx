import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activiy } from "../models/Activity";

export default class ActivityStore{
    
    activities:Activiy[]=[];
    selectedActivity:Activiy|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;

    constructor()
    {
       makeAutoObservable(this);
    }

    setloadingInitial=(flag:boolean)=>{
      this.loadingInitial=flag;
    }

    loadActivites= async()=>{
     this.setloadingInitial(true);
     this.activities = [];
     try{
      const data= await agent.Activities.list();
        data.forEach(ac=> {
            ac.date = new Date(ac.date!);
             this.activities.push(ac);
        })
        
        this.setloadingInitial(false);
     }
     catch(error)
     {
         console.log(error);
        this.loadingInitial=false;
     }
    }

    createActivity=async(activity:Activiy)=>{
      this.loading = true;
      try{
          await agent.Activities.create(activity);
          runInAction(()=>{
            this.activities.push(activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
          })
      }
      catch(error){
          console.log(error);
          runInAction(()=>{
            this.loading=false;
          })
      }
    }

    updateActivity=async(activity:Activiy)=>{
     this.loading = true;
     try{
        await agent.Activities.update(activity);
        runInAction(()=>{
          this.activities=[...this.activities.filter(x=>x.id!==activity.id)];
          this.activities.push(activity);
          this.selectedActivity = activity;
          this.editMode=false;
          this.loading = false;
        })
     }
     catch(error)
     {
       console.log(error);
        runInAction(()=>{
            this.loading=false;
          })
     }
    }

    get activityByDate(){
          return Array.from(this.activities).sort((a,b)=> a.date!.getTime()-b.date!.getTime());
    }

    get groupActivities()
    {
      return Object.entries(
        this.activityByDate.reduce((activities,activity)=>{
          const date =  format(activity.date!, 'dd MMM yyyy');
          activities[date] = activities[date]?[...activities[date],activity]:[activity];
          return activities;
        },{} as {[key:string]:Activiy[]} )
      )
    }

    loadActivity=async (id:string) => {
      this.loadingInitial=true;
      try{        
        let activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(()=>{
          this.selectedActivity = activity;
        })
       
        this.setloadingInitial(false);
        return activity;
      }
      catch(error){
        console.log(error);
        this.setloadingInitial(false);
      }
    }

    private setActivity = (activity:Activiy)=>{
      activity.date = new Date(activity.date!);
      this.activities = [...this.activities.filter(x=>x.id!==activity.id),activity];     
    }

    deleteActivity=async(id:string)=>{
      this.loading=true;
      try{
        await agent.Activities.delete(id);
        runInAction(
          ()=>{
            this.activities = [...this.activities.filter(x=>x.id!==id)];           
            this.loading=false;
          }
        )

      }catch(error)
      {
        console.log(error);
        this.loading=false;
      }
      
    }
}