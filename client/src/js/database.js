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

// Accept some content and add it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Connect to the database
  const connectDB = await openDB('jateDB', 1);

  // Create a new transaction (Specify DB & data privileges)
  const tx = connectDB.transaction('jateDB', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jateDB');

  // Store and pass in the content.
  const request = store.add({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Info added to DB', result);
}

// Get all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Connect to the database
  const connectDB = await openDB('jateDB', 1);

  // Create a new transaction (Specify DB & data privileges)
  const tx = connectDB.transaction('jateDB', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jateDB');

  // Get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('GET values', result);
  return result;
}

initdb();
