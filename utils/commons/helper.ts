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
export function confirm(_this: any, header: string = '', message: string = '', icon: string = '',
  acceptLabel: string = '', acceptClass: string = '', rejectLabel: string = '', accept: any) {
  _this.$confirm.require({
    message: message,
    header: header,
    icon: icon,
    acceptClass: acceptLabel,
    acceptLabel: acceptClass,
    rejectLabel: rejectLabel,
    accept: () => accept()
  });
}

export function getDateFormat(date: string | Date) {
  if (!date) {
    return null
  }

  if (date instanceof Date) {
    return date
  } else {
    return date.split("-").reverse().join("-")
  }
}