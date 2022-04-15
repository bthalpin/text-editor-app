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


const deleteExtraLines = async (lines,totalLines) => {

  // Creates a bound range of extra lines to delete from database
  const keyRange = IDBKeyRange.bound(lines,totalLines.length-1)
  
  const editorDB = await openDB('editor',1)
  const tx = editorDB.transaction('editor','readwrite')
  const store = tx.objectStore('editor')
  
  // Deletes the range created
  const request = store.delete(keyRange)
  const result = await request
  return result
}

export const putDb = async (content,lineCount) => {
  
  const editorDb = await openDB('editor',1)
  const tx = editorDb.transaction('editor','readwrite')
  const store = tx.objectStore('editor')

  // Creates an array consisting of each line of editor to store individually
  content.split('\n').forEach((line,index)=>{
    store.put({editor:line,id:index})
  })
  
  // Checks total lines saved against current line count.  Calls deleteExtraLines if there are extra lines
  const lineCountDB = await getDb()
  if (lineCountDB.length>lineCount){
    deleteExtraLines(lineCount,lineCountDB)
  }
  
};


export const getDb = async () => {

  // Opens the indexedDb database and gets all the content
  const editorDb = await openDB('editor',1)
  const tx = editorDb.transaction('editor','readonly')
  const store = tx.objectStore('editor')
  const request = store.getAll()
  const result = await request
  return result
};

initdb();
