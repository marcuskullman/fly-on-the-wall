import { createContext, useReducer, FC, ReactNode } from "react"
import { IDefaultContext, defaultContext } from "./default-context"

export interface IDefaultContextDraft extends Partial<IDefaultContext> {}

type ContextType = [IDefaultContext, (action: IDefaultContextDraft) => void]
export const Context = createContext<ContextType>([defaultContext, () => {}])

interface Props {
  children: ReactNode
}

export const Provider: FC<Props> = ({ children }) => {
  const [context, dispatch]: ContextType = useReducer(
    (context: IDefaultContext, action: IDefaultContextDraft) => ({
      ...context,
      ...action,
    }),
    defaultContext
  )

  return (
    <Context.Provider value={[context, dispatch]}>{children}</Context.Provider>
  )
}
