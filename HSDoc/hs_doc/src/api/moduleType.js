import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    getModuleType: (params) => {
        return Post('/moduleType/getList', params)
    },
    getModuleTypeList: (params) => {
        return Post('/moduleType/getModuleType', params)
    },

}