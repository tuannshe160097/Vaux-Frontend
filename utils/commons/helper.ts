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
export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
