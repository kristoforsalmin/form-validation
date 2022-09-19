import { lazyDefine } from '@github/catalyst'

lazyDefine('confirmation-text-control', () => import('./components/ConfirmationTextControl.js'))
lazyDefine('site-form', () => import('./components/SiteForm.js'))
lazyDefine('site-registration', () => import('./components/SiteRegistration.js'))
lazyDefine('text-control', () => import('./components/TextControl.js'))
