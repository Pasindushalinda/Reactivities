export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<Activity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = '';
  description: string = '';
  category: string = '';
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = '';
  venue: string = '';

  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}
