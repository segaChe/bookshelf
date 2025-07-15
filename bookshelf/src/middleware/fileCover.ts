import buildStorage from './file';
import multer  from 'multer';

export default multer({ storage: buildStorage('public/img') });
