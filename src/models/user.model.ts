import { ObjectId } from "mongodb";

export default interface User {
  id?: ObjectId;
  name: string;
  email: string;
  serviceId: ObjectId;
  seats: number;
  updaterPin: string;
}
