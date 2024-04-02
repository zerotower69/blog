import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

const timeFormatPattern = 'YYYY年MM月DD日 HH时mm分ss秒';

export const columns: BasicColumn[] = [
  {
    title: '文章标题',
    dataIndex: 'title',
    minWidth: 120,
    maxWidth: 200,
    showSorterTooltip: true,
  },
  {
    title: '文章类型',
    dataIndex: 'type',
    width: 100,
    format(text, record, index) {
      return text === 'others' ? '转载' : '原创';
    },
  },
  {
    title: '文章标签',
  },
  {
    title: '发布时间',
    dataIndex: 'createdAt',
    width: 160,
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
    showSorterTooltip: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 140,
    format(text, record, index) {
      return dayjs(text).format(timeFormatPattern);
    },
    showSorterTooltip: true,
  },
];
