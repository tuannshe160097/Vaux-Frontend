import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $api, PathBind } from '~/utils'
@Module({
    stateFactory: true,
    namespaced: true
})

export default class StoreItem extends VuexModule {
    private static readonly STATE_URL = {
        PATCH_MARK_AS_READ: '/Notification/:notiId/MarkAsRead',
    }

    @Action({ rawError: true })
    async actPatchMarkAsRead(params: any): Promise<string | undefined> {
        try {
            const url = PathBind.transform(this.context, StoreItem.STATE_URL.PATCH_MARK_AS_READ, { notiId: params.notiId })
            return await $api.patch(url)
        } catch (error) { }
    }
}

