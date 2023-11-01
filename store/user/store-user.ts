import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
    stateFactory: true,
    namespaced: true
})

export default class StoreCategory extends VuexModule {
    private static readonly STATE_URL = {
        SEARCH_USER: '/mod/account?:pageNum&:pageSize',
        GET_USER: '/mod/account/:userId',
        CREATE_MOD: '/Admin/Account/CreateModerator',
        CREATE_EXPERT: '/Mod/Account/CreateExpert',
    }


    @Action({ rawError: true })
    async actSearchUser(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.SEARCH_USER, { pageNum: params?.pageNum, pageSize: params?.pageSize })
            return await $api.get(url)
        } catch (error) { }
    }

    @Action({ rawError: true })
    async actGetUser(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.GET_USER, { userId: params?.userId })
            return await $api.get(url)
        } catch (error) { }
    }

    @Action({ rawError: true })
    async actCreateUser(params: any): Promise<string | undefined> {
        try {
            if (params.subject == 'MOD') {
                const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_MOD)
                return await $api.post(url, params)
            }
            else if(params.subject == 'EXP'){
                const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_EXPERT)
                return await $api.post(url, params)
            } else{
                throw new Error("Chưa có chủ thể")
            }
        } catch (error) { }
    }


    //   @Action({ rawError: true })
    //   async actUpdateCategory(params: any): Promise<string | undefined> {
    //     try {
    //       const url = PathBind.transform(this.context, StoreCategory.STATE_URL.UPDATE_CATEGORY, { id: params?.id })
    //      return await $api.put(url, params) 
    //     } catch (error) {}
    //   }
}
