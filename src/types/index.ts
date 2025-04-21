
export interface Column {
  id: string,
  title: string,
}

export type Task = {
  id: string,
  title: string,
  description: string,
  status: string,
}

export interface User {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  // add any other fields you have in Firestore
}