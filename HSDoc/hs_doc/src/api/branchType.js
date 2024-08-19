import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    getBranchType: (params) => {
        return Post('/branchType/getList', params)
    },
    addBranchType: (params) => {
        return Post('/branchType/insert', params)
    },
    deleteBranchType: (params) => {
        return Post('/branchType/deleteList', params)
    },
}