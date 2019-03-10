
const isRelease = !false;

const apiSetting = {
    timeout: 30000,
    baseUrl: isRelease ? "http://192.168.0.105:5001/api" : "http://localhost:5001/api",
    notFilterPaths: [""],
    clientId: isRelease ? "roclient" : "ro.client",
}

const secret = {
    key: "1234123412ABCDEF",
    iv: "ABCDEF1234123412"
}

module.exports = {
    isRelease,
    apiSetting,
    secret
};