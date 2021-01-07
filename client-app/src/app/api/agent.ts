import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'https://localhost:5001/api';

const requestBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(requestBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(requestBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(requestBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(requestBody),
};

const activities = {
  list: (): Promise<Activity[]> => request.get('/activities'),
  details: (id: string) => request.get(`/activities/${id}`),
  create: (activity: Activity) => request.post('/activities', activity),
  update: (activity: Activity) =>
    request.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
};

const exportActivities = {
  activities,
};

export default exportActivities;
