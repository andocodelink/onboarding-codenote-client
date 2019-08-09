import { INote } from '../index';

const range = n => Array.from(Array(n).keys())

export const fetchNotes = () => {
    return Promise.resolve(range(10).map(i => <INote> {
        noteId: '' + i,
        content: 'Content of note ' + i,
        createdAt: Date.now().toLocaleString()
    }));
}

export const getCurrentSession = () => {
    return Promise.resolve({});
  }
  
export const logout = () => {
  return Promise.resolve({});
}