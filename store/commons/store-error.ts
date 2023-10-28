import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ErrorResponse } from '~/utils'

@Module({
  stateFactory: true,
  namespaced: true
})
export default class StoreError extends VuexModule {

  public error: ErrorResponse | string = {}

  @Mutation
  setError(error: ErrorResponse) {
    this.error = error
  }
}
