import { v4 as uuidv4 } from 'uuid';
// 获取唯一id
function getUuid() {
    return uuidv4()
}

export {
    getUuid
}