import { openDB } from 'idb';

// Create database
const initdb = async () =>
	openDB('jate', 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains('jate')) {
				console.log('jate database already exists');
				return;
			}
			db.createObjectStore('jate', {
				keyPath: 'id',
				autoIncrement: true,
			});
			console.log('jate database created');
		},
	});

// Add text to indexedDB
export const putDb = async (content) => {
	const connectDB = await openDB('jate', 1);
	const tx = connectDB.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	const request = store.put({ id: 1, value: content });
	const result = await request;
	console.log(result);
};

// Retrieve text from indexedDB
export const getDb = async () => {
	const connectDb = await openDB('jate', 1);
	const tx = connectDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');
	const request = store.getAll();
	const result = await request;
	return result?.value;
};

initdb();