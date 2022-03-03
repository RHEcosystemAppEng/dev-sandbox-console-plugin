import type { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk/lib/extensions/console-types';

export const USER_EMAIL_ANNOTATION = 'toolchain.dev.openshift.com/user-email';
export const INTERNAL_DOMAINS = ['ibm.com', 'redhat.com'];

export const isInternalUser = (user: K8sResourceCommon): boolean => {
  const domain = user?.metadata?.annotations?.[USER_EMAIL_ANNOTATION]?.split('@')[1];
  return (
    !!domain && INTERNAL_DOMAINS.some((suffix) => domain.match(new RegExp(`\\b${suffix}$`, 'i')))
  );
};
