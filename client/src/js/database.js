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
  const keyRange = IDBKeyRange.bound(lines,totalLines.length-1)
  // console.log(lines,totalLines,'here')
  const editorDB = await openDB('editor',1)
  const tx = editorDB.transaction('editor','readwrite')
  const store = tx.objectStore('editor')
  // for (let i=lines;i<totalLines;i++){
    // store.delete(i)
    // const result = await request
    // console.log(result)
  // }
  // const request = store.delete(totalLines-1)
  // const result = await request
  // return result
  const request = store.delete(keyRange)
  const result = await request
  return result
}
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content,lineCount) => {
  // console.error('putDb not implemented')
  const editorDb = await openDB('editor',1)

  const tx = editorDb.transaction('editor','readwrite')

  const store = tx.objectStore('editor')

  // Creates an array consisting of each line of editor to store individually
  content.split('\n').forEach((line,index)=>{
    store.put({editor:line,id:index})
  })
  // console.log(content,'CONTENT',lineCount)

  // Checks total lines saved against current line count.  Calls deleteExtraLines if there are extra lines
  const lineCountDB = await getDb()
  // console.log(lineCountDB,lineCountDB.length,lineCount)
  if (lineCountDB.length>lineCount){
    deleteExtraLines(lineCount,lineCountDB)
  }
  // const request = store.put({editor:content,id:1},{editor:content,id:3})
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented')
  const editorDb = await openDB('editor',1)

  const tx = editorDb.transaction('editor','readonly')

  const store = tx.objectStore('editor')
  
  const request = store.getAll()
  const result = await request
  return result
};

initdb();
