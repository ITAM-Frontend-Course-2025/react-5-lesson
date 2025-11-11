type Item = { id: number; name: string }
function _internal(){ return 'hidden' }
export function listItems(): Item[] { return [{id:1,name:'a'}] }
export function createItem(name: string): Item { return { id: Date.now(), name } }
export default function Task(){ return <div>updated: {listItems().length}</div> }
