import dayjs from "dayjs";

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

export function getDateFormat(date: string | Date) {
  if (!date) {
    return null
  }

  if (date instanceof Date) {
    return date
  } else {
    return dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
  }
}