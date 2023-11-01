export function confirmDelete(_this: any, accept: any) {
  _this.$confirm.require({
    message: 'Bạn có chắc chắn muốn xóa không?',
    header: 'Xác nhận xóa',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Xóa',
    rejectLabel: 'Hủy',
    accept: () => accept()
  });
}

