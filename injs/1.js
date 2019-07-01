function a(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
        console.log("1a")
        res();},3000)
    })
}

function b() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("2b")
            res();
        }, 3000)
    })
}

function c() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("3c")
            res();
        }, 3000)
    })
}

function al(){
    return Promise.all([b(),c()]);
}

a().then(al).then(a)