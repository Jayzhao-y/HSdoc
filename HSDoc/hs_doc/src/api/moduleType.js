import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    getModuleType: (params) => {
        return Post('/moduleType/getList', params)
    },
    getModuleTypeList: (params) => {
        return Post('/moduleType/getModuleType', params)
    },
    updateModuleType: (params) => {
        return Post('/moduleType/update', params)
    },
    getFreq: (params) => {
        return Post('/module/getFreq', params)
    },
    getProcessList: (params) => {
        return Post('/moduleType/getProcessList', params)
    },
    addModuleType: (params) => {
        return Post('/moduleType/insert', params)
    },
    deleteModuleType:(params) => {
        return Post('/moduleType/deleteList', params)
    },
    uploadFile:(params) => {
        return Post('/moduleType/uploadSheet', params)
    },
    getSheetList:(params) => {
        return Post('/moduleType/getSheetList', params)
    },
    deleteSheetList:(params) => {
        return Post('/moduleType/deleteSheetList', params)
    },
}