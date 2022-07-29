import { useContext, useEffect, useRef } from "react"
import { Context, IDefaultContextDraft } from "../context"

export const useAppContext = (initialValue?: IDefaultContextDraft) => {
  const appContext = useContext(Context)
  const appContextRef = useRef(appContext)
  const initialValueRef = useRef(initialValue)

  useEffect(() => {
    if (initialValueRef.current) {
      const [context, dispatch] = appContextRef.current
      dispatch({ ...context, ...initialValueRef.current })
    }
  }, [])

  return appContext
}
