import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
    stateFactory: true,
    namespaced: true
})

export default class StoreCategory extends VuexModule {
    private static readonly STATE_URL = {
        SEARCH_USER: '/mod/account?pageNum=:pageNum&pageSize=:pageSize&orderBy=:orderBy',
        GET_USER: '/mod/account/:userId',
        UPDATE_USER: '/Admin/Account/:userId',
        CREATE_MOD: '/Admin/Account/CreateModerator',
        CREATE_EXPERT: '/Mod/Account/CreateExpert',
    }


    @Action({ rawError: true })
    async actSearchUser(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.SEARCH_USER, { pageNum: params?.pageNum, pageSize: params?.pageSize, orderBy : "id", role: params?.role })
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
    async actCreateMod(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_MOD)
            return await $api.post(url, params)
        } catch (error) { }
    }
    @Action({ rawError: true })
    async actCreateExpert(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.CREATE_EXPERT)
            return await $api.post(url, params)
        } catch (error) { }
    }

    @Action({ rawError: true })
    async actUpdateUser(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreCategory.STATE_URL.UPDATE_USER, { userId: params?.userId })
            return await $api.put(url, params)
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
