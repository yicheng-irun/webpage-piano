import Url from 'url';

const runtime = {
    isServer: false,
    isClient: true,
    isProd: true,
    isDev: false,

    serverOrigin: '',

    action: {
        req: {},
        res: {},
        next: () => {},
        params: {},
    },
    page: '',
    query: {},

    // 仅在服务端运行
    setServerContext (context) {
        const {
            req,
            res,
            next,
            serverOrigin,
            page,
            params,
        } = context;

        runtime.serverOrigin = serverOrigin;

        if (req) {
            runtime.action.req = req;
            runtime.query = req.query;
        }
        if (res) {
            runtime.action.res = res;
        }
        if (next) {
            runtime.action.next = next;
        }
        if (params) {
            runtime.action.params = params;
        }
        runtime.page = page;
    },

    clientInit () {
        const loc = Url.parse(location.href, true);
        runtime.serverOrigin = location.origin;
        
        runtime.query = loc.query;

        if (window._SSR_PAGE_) {
            runtime.page = window._SSR_PAGE_;
        } else {
            runtime.page = runtime.query._page;
        }
    },
};

if (global.process && global.process.env && global.process.env.VUE_ENV == 'server') {
    runtime.isServer = true;
    runtime.isClient = false;
} else {
    runtime.clientInit();
}
if (global.process && process.env && process.env.NODE_ENV == 'development') {
    runtime.isDev = true;
    runtime.isProd = false;
}


export default runtime;
