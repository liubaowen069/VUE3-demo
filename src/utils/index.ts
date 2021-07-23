export function localGet (key:any) {
    const value = window.localStorage.getItem(key)
    try {
        if(value){
            return JSON.parse(value)
        }
    } catch (error) {
      return value
    }
  }
  
  export function localSet (key:string, value:any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  export function localRemove (key:any) {
    window.localStorage.removeItem(key)
  }