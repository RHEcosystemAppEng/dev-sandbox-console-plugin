import type { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk/lib/extensions/console-types';
import { isInternalUser, USER_EMAIL_ANNOTATION } from 'src/utils';

const createUser = (email: string): K8sResourceCommon => ({
  apiVersion: 'v1',
  kind: 'User',
  metadata: {
    name: 'test-user',
    annotations: {
      [USER_EMAIL_ANNOTATION]: email,
    },
  },
});

describe('utils', () => {
  it('should identify internal users', () => {
    expect(isInternalUser(null)).toBe(false);
    expect(isInternalUser(undefined)).toBe(false);
    expect(isInternalUser(createUser('notanemail'))).toBe(false);
    expect(isInternalUser(createUser('test@redhat.com'))).toBe(true);
    expect(isInternalUser(createUser('test@ibm.com'))).toBe(true);
    expect(isInternalUser(createUser('test@RedHat.com'))).toBe(true);
    expect(isInternalUser(createUser('test@something.RedHat.com'))).toBe(true);
    expect(isInternalUser(createUser('test@IBM.com'))).toBe(true);
    expect(isInternalUser(createUser('test@ca.ibm.com'))).toBe(true);
    expect(isInternalUser(createUser('test@notredhat.com'))).toBe(false);
    expect(isInternalUser(createUser('test@notibm.com'))).toBe(false);
  });
});
