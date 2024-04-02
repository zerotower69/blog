import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

const timeFormatPattern = 'YYYY年MM月DD日 HH时mm分ss秒';
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'createdTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: {
      span: 12,
    },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '分类名',
    dataIndex: 'name',
    showSorterTooltip: true,
    minWidth: 120,
  },
  {
    title: '分类描述',
    dataIndex: 'desc',
    showSorterTooltip: true,
    minWidth: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    showSorterTooltip: true,
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    showSorterTooltip: true,
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
  },
];

export const classFormScheme: FormSchema[] = [
  {
    field: 'name',
    label: '分类名',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '分类名必填',
      },
      {
        validator: (rule, value, callback) => {
          if (value.length > 15) callback('分类名不能超过15字符');
          else {
            callback();
          }
        },
        trigger: 'change',
      },
    ],
    helpMessage: '分类的名称，不超过15字符',
    componentProps: {
      maxlength: 15,
      showCount: true,
      placeholder: '请输入',
    },
  },
  {
    field: 'desc',
    label: '分类描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      rows: 3,
      maxlength: 100,
      showCount: true,
      placeholder: '请输入分类描述',
    },
  },
];
