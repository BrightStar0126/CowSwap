import '@reach/dialog/styles.css'
import 'inter-ui'
import 'polyfills'
import 'components/analytics'

import { BlockNumberProvider } from 'lib/hooks/useBlockNumber'
import { MulticallUpdater } from 'lib/state/multicall'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Blocklist from 'components/Blocklist'
import Web3Provider from 'components/Web3Provider'
import { LanguageProvider } from 'i18n'
import App from 'pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from 'state'
import ApplicationUpdater from 'state/application/updater'
import ListsUpdater from 'state/lists/updater'
import LogsUpdater from 'state/logs/updater'
import TransactionUpdater from 'state/transactions/updater'
import UserUpdater from 'state/user/updater'
import GnosisSafeUpdater from 'state/gnosisSafe/updater'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from 'theme'
import RadialGradientByChainUpdater from 'theme/RadialGradientByChainUpdater'

import EnhancedTransactionUpdater from 'state/enhancedTransactions/updater'
import FeesUpdater from 'state/price/updater'
import GasUpdater from 'state/gas/updater'
import SentryUpdater from 'state/sentry/updater'

import {
  GpOrdersUpdater,
  CancelledOrdersUpdater,
  PendingOrdersUpdater,
  UnfillableOrdersUpdater,
} from 'state/orders/updaters'
// import { EventUpdater } from 'state/orders/mocks'
import AppziButton from 'components/AppziButton'
import { nodeRemoveChildFix } from 'utils/node'
import { Provider as AtomProvider } from 'jotai'

import Popups from 'components/Popups'
import { UploadToIpfsUpdater } from 'state/appData/updater'

// Node removeChild hackaround
// based on: https://github.com/facebook/react/issues/11538#issuecomment-417504600
nodeRemoveChildFix()

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <RadialGradientByChainUpdater />
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <EnhancedTransactionUpdater />
      <MulticallUpdater />
      <PendingOrdersUpdater />
      <CancelledOrdersUpdater />
      <FeesUpdater />
      <UnfillableOrdersUpdater />
      <GpOrdersUpdater />
      <GasUpdater />
      <LogsUpdater />
      <SentryUpdater />
      <UploadToIpfsUpdater />
      <GnosisSafeUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <FixedGlobalStyle />
    <Provider store={store}>
      <AtomProvider>
        <HashRouter>
          <LanguageProvider>
            <Web3Provider>
              <Blocklist>
                <BlockNumberProvider>
                  <Updaters />
                  <ThemeProvider>
                    <ThemedGlobalStyle />
                    <Popups />
                    <AppziButton />
                    <App />
                  </ThemeProvider>
                </BlockNumberProvider>
              </Blocklist>
            </Web3Provider>
          </LanguageProvider>
        </HashRouter>
      </AtomProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

// TODO: maybe re-enable service workers?
// if (process.env.REACT_APP_SERVICE_WORKER !== 'false') {
//   serviceWorkerRegistration.register()
// }

async function deleteAllCaches() {
  const cacheNames = (await caches.keys()) || []

  cacheNames.map((cacheName) => {
    console.log('[worker] Delete cache', cacheName)
    // Delete old caches
    // https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#removing_outdated_caches
    return caches.delete(cacheName)
  })
}

async function unregisterAllWorkers() {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

if ('serviceWorker' in navigator) {
  console.log('[worker] Unregister worker...')
  serviceWorkerRegistration.unregister()

  console.log('[worker] Deleting all caches...')
  deleteAllCaches()
    .then(() => console.log('[worker] All caches have been deleted'))
    .catch(console.error)

  console.log('[worker] Unregistering all workers...')
  unregisterAllWorkers()
    .then(() => console.log('[worker] All workers have been unregistered'))
    .catch(console.error)
}
