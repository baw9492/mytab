<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { links } from './store/links'
  import { show_linkediter } from './store/windows'
  import { compressImage } from './tools/compressImage'
  import { selectedId } from './store/selectedId'
  let input: HTMLInputElement
  let link_info = {
    linkUrl: '',
    iconBase64: '',
  }

  async function action() {
    // const _input = e.currentTarget as HTMLInputElement
    const i = URL.createObjectURL(input.files![0])
    const _img = new Image()
    _img.src = i
    _img.onload = () => {
      link_info.iconBase64 = compressImage(_img)
    }
  }
  function dragover_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    _div.style.backgroundColor = 'black'
  }
  function dragleave_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    _div.setAttribute('style', '')
  }
  function drop_action(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const _div = e.currentTarget as HTMLElement
    console.log(e.dataTransfer?.types)
    const file = e.dataTransfer?.files[0]
    if (file && file.type.includes('image')) {
      const i = URL.createObjectURL(file)
      const _img = new Image()
      _img.src = i
      _img.onload = () => {
        link_info.iconBase64 = compressImage(_img)
      }
    } else alert('请选择图片文件')
    _div.setAttribute('style', '')
  }

  async function submit_action(e: SubmitEvent) {
    if (
      !link_info.linkUrl.startsWith('http://') &&
      !link_info.linkUrl.startsWith('https://')
    ) {
      console.log('咋没有协议前缀呢, 没事我帮你加了')
      link_info.linkUrl = 'http://' + link_info.linkUrl
      console.log(link_info)
    }
    if ($selectedId === -1) {
      /* 添加 */
      // @ts-ignore 按理来说link需要一个 id 属性, 但是这里其实可以indexedDB 在插入数据时会自动添加自增id, 所以这里不需要主动写id
      let newlink: link = {
        ...link_info,
      }
      console.log(newlink)
      await links.add([newlink])
    } else {
      /* 修改 */
      links.update({ ...link_info, id: $selectedId })
    }
    show_linkediter.hide()
  }

  onMount(() => {
    if ($selectedId !== -1) {
      const _sl = $links.find((v) => v.id === $selectedId)
      link_info.iconBase64 = _sl?.iconBase64 ?? ''
      link_info.linkUrl = _sl?.linkUrl ?? ''
      // console.log(_sl)
    }
  })

  onDestroy(() => {
    selectedId.set(-1)
  })
</script>

<form
  class="fixed w-[400px] h-[200px] bg-[#4A4A4A] p-[20px] flex flex-col justify-between rounded shadow-md"
  on:submit|preventDefault={submit_action}
>
  <div class=" flex justify-between">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={() => {
        input.click()
      }}
      on:dragover={dragover_action}
      on:dragleave={dragleave_action}
      on:drop={drop_action}
      class="w-[100px] h-[100px] bg-[#353535] flex justify-center items-center rounded cursor-pointer"
    >
      {#if link_info.iconBase64 !== ''}
        <img
          class="w-12 h-12 object-contain rounded-md"
          src={link_info.iconBase64}
          alt=""
        />
      {:else}
        <div class="text-white text-lg">+</div>
      {/if}
    </div>
    <input
      bind:this={input}
      type="file"
      on:input={action}
      accept="image/*"
      class="hidden"
    />
    <div class="flex flex-col justify-between h-[100px] py-4">
      <div>
        <label for="title" class="mr-2 text-white">标题</label><input
          type="text"
          name="title"
          id="title"
          class="px-1"
        />
      </div>
      <div>
        <label for="url" class="mr-2 text-white">地址</label><input
          type="text"
          name="url"
          id="url"
          class="px-1"
          bind:value={link_info.linkUrl}
        />
      </div>
    </div>
  </div>
  <div class="flex">
    <button
      type="button"
      class="bg-slate-300 block flex-1 h-10 mr-1 hover:opacity-50"
      on:click={() => show_linkediter.hide()}>取消</button
    >
    <button
      type="submit"
      class="bg-slate-300 block flex-1 h-10 ml-1 hover:opacity-50">确定</button
    >
  </div>
</form>
