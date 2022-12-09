// ENUM with routes
export enum Routes {
  HOME = '/',
  SWAP = '/:chainId?/swap/:inputCurrencyId?/:outputCurrencyId?',
  LIMIT_ORDER = '/:chainId?/limit-orders/:inputCurrencyId?/:outputCurrencyId?',
  SEND = '/send',
  ACCOUNT = '/account',
  ACCOUNT_TOKENS = '/account/tokens',
  ACCOUNT_TOKENS_SINGLE = '/account/tokens/:address',
  ACCOUNT_GOVERNANCE = '/account/governance',
  ACCOUNT_AFFILIATE = '/account/affiliate',
  ABOUT = '/about',
  PRIVACY_POLICY = '/privacy-policy',
  COOKIE_POLICY = '/cookie-policy',
  TERMS_CONDITIONS = '/terms-and-conditions',
  FAQ = '/faq',
  FAQ_PROTOCOL = '/faq/protocol',
  FAQ_TOKEN = '/faq/token',
  FAQ_TRADING = '/faq/trading',
  FAQ_AFFILIATE = '/faq/affiliate',
  FAQ_LIMIT_ORDERS = '/faq/limit-order',
  PLAY_COWRUNNER = '/play/cow-runner',
  PLAY_MEVSLICER = '/play/mev-slicer',
  ANYSWAP_AFFECTED = '/anyswap-affected-users',
  CHAT = '/chat',
  DOCS = '/docs',
  STATS = '/stats',
  TWITTER = '/twitter',
}
