import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

export default function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((records) => {
        if (!controller.signal.aborted) setItems(records)
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint])

  return { items, loading, error }
}