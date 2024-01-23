export interface IBaseWorkPlace {
  id: number
  x: number
  y: number
  plan: number
  employee: number
}

export interface IWorkPlace {
  id: number
  x: number
  y: number
  name: IName
}

export interface IPlan {
  id: number
  name: string
  img: string
  width: number
  height: number
}

export interface IFullPlan extends IPlan {
  workplaces: IBaseWorkPlace[]
}

export interface IName {
  id: number
  username: string | null | undefined
}
