import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';

export interface INote {
  noteId: string,
  content: string,
  createdAt: string,
}

export const fetchNotes = () => {
    return API.get("notes", "/notes", {});
}

export const getCurrentSession = () => {
  return Auth.currentSession();
}

export const logout = () => {
  return Auth.signOut();
}