export const useHashChange = () => {
  const { scrollToPosition } = useScroller()

  const hashMap = ['#home', '#about-me', '#my-work', '#contact']
  const onHashChange = () => {
    const hash = location.hash
    if (hash) scrollToPosition.value = hashMap.indexOf(hash)
  }

  onMounted(() => {
    onHashChange()
    addEventListener('hashchange', onHashChange)
  })

  onUnmounted(() => {
    removeEventListener('hashchange', onHashChange)
  })
}
