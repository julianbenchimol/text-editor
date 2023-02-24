import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

export const postDb = async(content) =>{
  console.log('post to the database');

  const noteDb = await openDB('jate', 1);
  const tx = noteDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({noteContent: content})
  const result = await request;

  console.log("Note Saved!", result)
}

export const getDb = async() =>{
  console.log("getting database info");

  const noteDb = await openDB('jate', 1)
  const tx = noteDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate')
  const request = store.getAll();

  const result = await request;
  console.log("results: ", result);
  return result;
}

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

initdb();
