import Cookies from "js-cookie";

const cookieHelper = {
    set: (name, value, expire) => {
        var date = new Date;
        var time = new Date(date.setSeconds(date.getSeconds() + expire));
        Cookies.set(name, JSON.stringify(value), { expires: time });
    },
    get: (name) => Cookies.get(name),
    remove: (name) => Cookies.remove(name),
    clearAll: () => {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
};

export default cookieHelper;