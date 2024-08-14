import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    addUnit: (params) => {
        return Post('/unit/insert', params)
    },
    getUnit: (params) => {
        return Post('/unit/getList', params)
    },
    deleteUnit: (params) => {
        return Post('/unit/deleteList', params)
    },
}