interface Poster {
  src: string
  top: number
  left: number
  rotation: number
}
export interface IDefaultContext {
  config: {
    speed: number
  }
  posters?: Poster[]
}

export const defaultContext: IDefaultContext = {
  config: {
    speed: 5,
  },
}
