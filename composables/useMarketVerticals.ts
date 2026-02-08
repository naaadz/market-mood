export function useMarketVerticals() {
  const refreshKey = ref(0)

  const { data, status, error, refresh: refetch } = useFetch(
    () => `/api/verticals?refresh=${refreshKey.value > 0}`,
    {
      lazy: true,
      server: false,
      key: `verticals-${refreshKey.value}`
    }
  )

  const refresh = async () => {
    refreshKey.value++
    await refetch()
  }

  return {
    verticals: data,
    loading: computed(() => status.value === 'pending'),
    error,
    refresh
  }
}
