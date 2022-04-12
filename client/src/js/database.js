import { openDB } from 'idb';

const initdb = async () =>
  openDB('editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('editor')) {
        console.log('editor database already exists');
        return;
      }
      db.createObjectStore('editor', { keyPath: 'id', autoIncrement: true });
      console.log('editor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id,content) => {
  // console.error('putDb not implemented')
  const editorDb = await openDB('editor',1)

  const tx = editorDB.transaction('editor','readwrite')

  const store = tx.objectStore('editor')
  
  const request = store.put({id,editor:content})
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented')
  const editorDb = await openDB('editor',1)

  const tx = editorDB.transaction('editor','readwrite')

  const store = tx.objectStore('editor')
  
  const request = store.getAll()
};

initdb();
