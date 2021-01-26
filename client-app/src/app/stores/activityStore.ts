import {
  action,
  computed,
  observable,
  configure,
  runInAction,
  makeAutoObservable,
} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { Activity } from '../models/activity';

configure({ enforceActions: 'always' });

class activityStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable activityRegistry = new Map();
  @observable activity: Activity | null = null;
  @observable loadingInitials = false;
  @observable submitting = false;
  @observable target = '';

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: Activity) => {
    this.submitting = true;
    try {
      await agent.activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`)
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action loadActivities = async () => {
    this.loadingInitials = true;
    try {
      const activities = await agent.activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitials = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitials = false;
      });
      throw error;
    }
  };

  @computed get activitiesByDate() {
    return this.groupActivityByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivityByDate(activities: Activity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitials = true;
      try {
        let activity = await agent.activities.details(id);
        runInAction(() => {
          activity.date = new Date(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitials = false;
        });
        return activity;
      } catch (error) {
        runInAction(() => {
          this.loadingInitials = false;
        });
        console.log(error);
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action editActivity = async (activity: Activity) => {
    this.submitting = true;
    try {
      await agent.activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`)
    } catch (error) {
      runInAction(() => {
        this.submitting = true;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });

      console.log(error);
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };
}

export default createContext(new activityStore());
