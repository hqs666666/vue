
const isRelease = false;

const apiSetting = {
    timeout: 30000,
    baseUrl: isRelease ? "http://www.hqs.pub/api" : "http://localhost:5001/api",
    notFilterPaths: [""],
    clientId: isRelease ? "1" : "2",
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