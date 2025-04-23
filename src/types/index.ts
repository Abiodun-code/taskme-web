
export interface Column {
  id: string,
  title: string,
}

export interface User {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  // add any other fields you have in Firestore
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  userId: string;
}
