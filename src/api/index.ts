import { API } from 'aws-amplify';
import { async } from 'q';

export interface INote {
  noteId: string,
  content: string,
  createdAt: string,
}

export const fetchNotes = () => {
    return API.get("notes", "/notes", {});
}