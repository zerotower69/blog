<template>
  <Select
    v-model:value="tags"
    :options="options"
    @popup-scroll="handleScroll"
    mode="multiple"
    allow-clear
    show-search
    placeholder="请选择文章标签"
  >
    <template #dropdownRender="{ menuNode: menu }">
      <div class="flex w-full bg-[#efefef] px-[5px] py-[5px]"
        >你还能添加<strong class="px-1">{{ 3 - tags.length }}</strong
        >个标签</div
      >
      <VNodes :vnodes="menu" />
    </template>
  </Select>
</template>
<script setup lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { Select } from 'ant-design-vue';
  import { getTagListApi } from '@/api/blog/tag';

  const props = defineProps({
    value: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  });
  const tags = useVModel(props, 'value');

  const VNodes = defineComponent({
    props: {
      vnodes: {
        type: Object,
        required: true,
      },
    },
    render() {
      return this.vnodes;
    },
  });
  const options = ref<{ label: string; value: number }[]>([]);
  const loadState = reactive({
    page: 0,
    name: '',
    loadingMore: false,
  });
  watch(
    () => loadState.name,
    () => {
      loadState.page = 0;
      options.value.length = 0;
    },
  );
  watch(
    () => tags.value,
    (val) => {
      //监听选择并设置禁用
      const leftOptions = options.value.filter((option: Recordable) => !val.includes(option.value));
      leftOptions.forEach((option: Recordable) => {
        option.disabled = val.length >= 3;
      });
    },
  );
  function getList() {
    loadState.page++;
    loadState.loadingMore = true;
    const getDisabled = () => {
      return tags.value.length >= 3;
    };
    getTagListApi({
      page: loadState.page,
      pageSize: 12,
      name: loadState.name,
    })
      .then((data: Recordable) => {
        const items = data?.items ?? [];
        options.value.push(
          ...items.map((item) => ({ label: item.name, value: item.id, disabled: getDisabled() })),
        );
      })
      .finally(() => {
        loadState.loadingMore = false;
      });
  }
  onMounted(() => {
    getList();
  });
  function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (!loadState.loadingMore && target.scrollHeight - target.scrollTop <= target.clientHeight) {
      getList();
    }
  }
</script>

<style scoped lang="less"></style>
