import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const blog: AppRouteModule = {
  path: '/blog',
  name: 'Blog',
  component: LAYOUT,
  redirect: '',
  meta: {
    orderNo: 10,
    icon: 'ion:document-outline',
    title: '博客',
  },
  children: [
    {
      path: 'article',
      name: 'BlogArticle',
      meta: {
        title: '文章管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/blog/article/index.vue'),
    },
    {
      path: 'article/add',
      name: 'AddBlogArticle',
      meta: {
        title: '新增文章',
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('@/views/blog/article/ArticleEditor.vue'),
    },
    {
      path: 'article/edit/:id',
      name: 'EditBlogArticle',
      meta: {
        title: '编辑文章',
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('@/views/blog/article/ArticleEditor.vue'),
    },
    {
      path: 'tag',
      name: 'BlogTag',
      meta: {
        title: '标签管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/blog/tag/index.vue'),
    },
    {
      path: 'class',
      name: 'BlogClass',
      meta: {
        title: '分类管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/views/blog/classes/index.vue'),
    },
  ],
};

export default blog;
