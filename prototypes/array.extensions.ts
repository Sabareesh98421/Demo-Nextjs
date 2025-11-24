// @ts-ignore

declare global {
    interface Array<T> {
        deleteItemById(index: any): boolean
        insertAt(index: number, value: T): this
    }
}
Array.prototype.deleteItemById = function(id:any) {
    const index:number = this.findIndex((item)=>item?.id===id);
    if (index < 0 || index >= this.length) return false
    this.splice(index, 1)
    return true
}

Array.prototype.insertAt = function(index: number, value: any) {
    if (index < 0) index = 0
    if (index > this.length) index = this.length
    this.splice(index, 0, value)
    return this
}

export {}