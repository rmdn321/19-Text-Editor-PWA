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
export const putDb = async (content) => {
  const newDb = await openDB('jate', 1);  
  const transaction = newDb.transaction('jate', 'readwrite');  
  const objStore = transaction.objectStore('jate');  
  const req = objStore.put({ content: content }) 
  const res = await req;
  console.log('data saved to the DB', res);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const newDb = await openDB('jate', 1);  
  const transaction = newDb.transaction('jate', 'readwrite'); 
  const objStore = transaction.objectStore('jate');  
  const req = objStore.getAll()  
  const res = await req;
  console.log('data fetched from the DB', res);
}

initdb();
