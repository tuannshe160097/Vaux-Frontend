<template>
  <section class="">
    <Menubar :model="items">
      <template #start>
        <img alt="logo" height="40" class="mr-2" />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
        <Button
          label="Logout"
          icon="pi pi-power-off"
          :style="{ 'margin-left': '0 .5em' }"
        />
      </template>
    </Menubar>
    <div
      class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div class="grid justify-content-center col-12 md:col-6 lg:col-4">
        <div class="text-3xl font-medium text-900 mb-3">Thông tin chi tiết</div>
        <div class="font-medium text-500 mb-3 w-full">
          <label class="block font-bold mb-2" for="inputName">
            Họ và tên
          </label>
          <span class="p-input-icon-left mb-3 w-full">
            <div class="icon icon--left icon-user bg-primary"></div>

            <InputText
              class="w-full"
              id="inputName"
              type="text"
              v-model="name"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  layout: 'default',
  data() {
    return {
      items: [
        {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Bookmark',
                  icon: 'pi pi-fw pi-bookmark',
                },
                {
                  label: 'Video',
                  icon: 'pi pi-fw pi-video',
                },
              ],
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-trash',
            },
            {
              separator: true,
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Left',
              icon: 'pi pi-fw pi-align-left',
            },
            {
              label: 'Right',
              icon: 'pi pi-fw pi-align-right',
            },
            {
              label: 'Center',
              icon: 'pi pi-fw pi-align-center',
            },
            {
              label: 'Justify',
              icon: 'pi pi-fw pi-align-justify',
            },
          ],
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-user-minus',
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: 'Filter',
                  icon: 'pi pi-fw pi-filter',
                  items: [
                    {
                      label: 'Print',
                      icon: 'pi pi-fw pi-print',
                    },
                  ],
                },
                {
                  icon: 'pi pi-fw pi-bars',
                  label: 'List',
                },
              ],
            },
          ],
        },
        {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus',
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
            },
            {
              label: 'Archieve',
              icon: 'pi pi-fw pi-calendar-times',
              items: [
                {
                  label: 'Remove',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
            },
          ],
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off',
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang='sass'>
.logo-block
    height: 54px
img
    height: 100%
</style>
