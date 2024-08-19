import { Post, Put, Delete,Download,Upload} from '@/utils/request';

export default {
    addBranch: (params) => {
        return Post('/branch/insert', params)
    },
    getBranch: (params) => {
        return Post('/branch/getList', params)
    },
    deleteBranch: (params) => {
        return Post('/branch/deleteList', params)
    },
    getBranchType: (params) => {
        return Post('/branch/getBranchType', params)
    },
    getSatistic: (params) => {
        return Post('/statistic/getList', params)
    },
}