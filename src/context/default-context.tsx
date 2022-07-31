export interface IDefaultContext {
  config: {
    speed: number
  }
  level: number
  paused: boolean
}

export const defaultContext: IDefaultContext = {
  config: {
    speed: 5,
  },
  level: 1,
  paused: true,
}
