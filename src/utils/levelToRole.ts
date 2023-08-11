import useMainStore from '@/store/main/main'

export function levelToRole(level: string) {
  let role: string = ''
  const mainStore = useMainStore()
  for (const item of mainStore.allRoles) {
    if (level === item.value) role = item.label
  }
  return role
}
