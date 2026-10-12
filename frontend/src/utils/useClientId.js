import { getBranding } from './useVendorLogo'

/**
 * Returns { profile_id, subdomain, domain } for storefront API calls.
 * Before the branding lookup has finished the placeholders are sent instead;
 * the API then resolves the request to the configured store on its own.
 */
export default function getClientId() {
  const { profileId, storeKey } = getBranding()
  return {
    profile_id: profileId || 'default',
    subdomain:  storeKey || 'default',
    domain:     '',
  }
}
