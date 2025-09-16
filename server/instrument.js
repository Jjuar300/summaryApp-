const sentry = require('@sentry/node'); 
const {nodeProfilingIntegration} = require('@sentry/profiling-node')
sentry.init({
    dsn: "https://fb3384e7c218f3e8c887add378bfe68a@o4510013303554048.ingest.us.sentry.io/4510013306241024", 
    sendDefaultPii: true, 
})