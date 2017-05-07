import Bmob from './bmob.js';
function currentUser()
{
    return Bmob.User.current();
}

function createObj(modelname,data={})
{
    let obj=Bmob.Object.extend(modelname);
    let keys=data.keys();
    let result=new obj();
    for(let key of keys)
    {
        result.set(key,data[key]);
    }
    return result;
}

export default {
    currentUser,
    createObj
}