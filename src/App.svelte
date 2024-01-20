<script lang="ts">
  import { links } from './lib/store/links'
  import { col } from './lib/store/col'
  import {
    show_menu,
    show_settings,
    show_linkediter,
  } from './lib/store/windows'
  import Menu from './lib/Menu.svelte'
  import Settings from './lib/Settings.svelte'
  import LinkEditer from './lib/LinkEditer.svelte'
  let position = { x: 0, y: 0 }
  let lob: 'b' | 'l' = 'b'
  let selected_link: number
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="h-full flex justify-center items-center select-none overflow-auto"
  on:contextmenu|preventDefault={(e) => {
    position = { x: e.clientX, y: e.clientY }
    lob = 'b'
    show_menu.show()
  }}
  on:click={() => {
    show_menu.hide()
  }}
>
  <div
    class="grid gap-[5px]"
    style="grid-template-columns: repeat({$col}, 1fr);"
  >
    {#each $links as i (i.id)}
      <a
        on:contextmenu|stopPropagation|preventDefault={(e) => {
          // console.log(i.id)
          position = { x: e.clientX, y: e.clientY }
          show_menu.show()
          lob = 'l'
          selected_link = i.id
        }}
        href={i.linkUrl}
        class="bg-[#353535] w-[100px] h-[100px] rounded flex justify-center items-center bl hover:border-[3px] hover:border-[#9A9A9A]"
      >
        {#if i.iconBase64}
          <img
            class="w-12 h-12 rounded-md object-contain"
            src={i.iconBase64}
            alt=""
          />
        {/if}
      </a>
    {/each}
  </div>

  {#if $show_menu}
    <Menu {position} {lob} {selected_link} />
  {/if}

  {#if $show_settings}
    <Settings />
  {/if}

  {#if $show_linkediter}
    <LinkEditer />
  {/if}
</div>
