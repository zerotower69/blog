import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

const timeFormatPattern = 'YYYY年MM月DD日 HH时mm分ss秒';

export const columns: BasicColumn[] = [
  {
    title: '标签名',
    dataIndex: 'name',
    width: 200,
    showSorterTooltip: true,
    edit: true,
    editComponent: 'Input',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
    showSorterTooltip: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
    showSorterTooltip: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标签名',
    component: 'Input',
    colProps: { span: 8 },
  },
];
