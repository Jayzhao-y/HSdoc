import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    addModule: (params) => {
        return Post('/module/insert', params)
    },
    getModule: (params) => {
        return Post('/module/getList', params)
    },
    deleteModule: (params) => {
        return Post('/module/deleteList', params)
    },
    updateModule: (params) => {
        return Post('/module/updateList', params)
    },
    getFreq: (params) => {
        return Post('/module/getFreq', params)
    },
    getProcessNum: (params) => {
        return Post('/module/getProcessNum', params)
    },
   
}