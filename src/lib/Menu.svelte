<script lang="ts">
  import { getContext } from 'svelte'
  import { links } from './store/links'
  import { show_linkediter, show_menu, show_settings } from './store/windows'
  import { selectedId } from './store/selectedId'
  export let lob: 'b' | 'l'
  export let position = { x: 0, y: 0 }
  export let selected_link: number
  // @ts-ignore
  const menuItems = [
    {
      title: '添加',
      type: 'b',
      fn: () => {
        show_linkediter.show()
      },
    },
    {
      title: '修改',
      type: 'l',
      fn: () => {
        show_linkediter.show()
        selectedId.set(selected_link)
      },
    },
    {
      title: '删除',
      type: 'l',
      fn: () => {
        links.delete(selected_link)
      },
    },
    {
      title: '设置',
      type: 'b',
      fn: () => {
        show_settings.show()
      },
    },
  ]

  // function deletAction() {
  //   links.delete(selected_link)
  // }
</script>

<ul
  class="fixed bg-[#4A4A4A] text-[aliceblue] w-[100px] text-xs"
  style={`top: ${position.y}px;left: ${position.x}px;`}
>
  {#each menuItems as item}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if item.type === lob}
      <li
        class="p-2 text-center cursor-pointer hover:outline hover:outline-1 hover:outline-white"
        on:click={item.fn}
      >
        {item.title}
      </li>
    {/if}
  {/each}
</ul>
