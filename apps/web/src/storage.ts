import {FileStorage} from '@flystorage/file-storage';
import {LocalStorageAdapter} from '@flystorage/local-fs';
import { resolve } from 'path';

const rootDirectory = resolve(process.cwd(), 'storage');
console.log(rootDirectory);
const adapter = new LocalStorageAdapter(rootDirectory);
const storage = new FileStorage(adapter);

export default storage;