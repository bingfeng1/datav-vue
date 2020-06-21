import { v4 as uuidv4 } from 'uuid';
// 获取唯一id
function getUuid() {
    return uuidv4()
}

// 防抖
function debounce(fn, wait) {
    let timer;
    return function () {
        let context = this
        let args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(context, [context,...args])
            timer = null
        }, wait)
    }
}

export {
    getUuid,
    debounce
}