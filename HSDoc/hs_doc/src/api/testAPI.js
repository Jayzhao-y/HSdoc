import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    testAPI: (params) => {
        return Post('/module/insert', params)
    }
}