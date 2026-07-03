const imageKit = require('@imagekit/nodejs')

const imageKit = new imageKit({
    privateKey: "private_XPf3BP7RWIT8SwoLzVWsFzO1Q1I="
})

async function uploadfile(buffer){
    const result = await imageKit.client.upload({
        file: buffer,
        fileName: "image.jpg"
        
    })
    return result;
}
module.exports = uploadfile;