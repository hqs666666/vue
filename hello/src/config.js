const isDebug = !true;
const appsettings = {
    baseUrl: isDebug ? "http://localhost:5000" : "http://10.110.74.41:5000",
    loginUrl: isDebug ? "http://localhost:54041" : "http://10.110.74.41:8015",
    cookieNames: {
        sessionId: "Finance_SessionId"
    }
}

export default appsettings;