export class StorageHelper{
    
    setItem=(key,value)=>{
        localStorage.setItem(key,value)
        
    }
    getItem=(key)=>{
       return localStorage.getItem(key)
    }

    clearStorage=()=>{
        localStorage.clear()
    }
}
