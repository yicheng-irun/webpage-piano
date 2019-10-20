const runtime = {
  isServer: false,
  isClient: true,
  isProd: true,
  isDev: false,
};

if (global.process && process.env && process.env.NODE_ENV === 'development') {
  runtime.isDev = true;
  runtime.isProd = false;
}

export default runtime;
