import { ObjectId } from "mongodb";

export default interface Service {
  id?: ObjectId;
  date: Date;
  seats: number;
}
