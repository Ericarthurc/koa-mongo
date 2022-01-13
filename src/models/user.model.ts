import { ObjectId } from 'mongodb';

export default interface User {
  id?: ObjectId;
  name: string;
  email: string;
  serviceDate: string;
  serviceId: string;
  seats: number;
  updaterPin: number;
}
