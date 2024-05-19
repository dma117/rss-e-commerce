import { Client } from '@commercetools/sdk-client-v2';
import {
  createAnonymousSession,
  createAuthorizedSession,
  MyTokenCache,
  refreshAuthorizedSession,
} from './build-client';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';

function createApiRoot(session: Client): ByProjectKeyRequestBuilder {
  const apiRoot = createApiBuilderFromCtpClient(session).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });
  return apiRoot;
}

export function createAnonymousApiBuilder(): ByProjectKeyRequestBuilder {
  return createApiRoot(createAnonymousSession());
}

function createAuthorizedApiBuilder(
  username: string,
  password: string,
): ByProjectKeyRequestBuilder {
  return createApiRoot(createAuthorizedSession(username, password));
}
function createRefreshedAuthorizedApiBuilder(refreshToken: string): ByProjectKeyRequestBuilder {
  return createApiRoot(refreshAuthorizedSession(refreshToken));
}

type AuthenticationResult = {
  success: boolean;
  apiBuilder?: ByProjectKeyRequestBuilder;
  errorMessage?: string | undefined;
};

export function login(
  apiRoot: ByProjectKeyRequestBuilder,
  email: string,
  password: string,
): Promise<AuthenticationResult> {
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute()
    .then(() => {
      const apiBuilder = createAuthorizedApiBuilder(email, password);
      apiBuilder.get().execute();
      return { success: true, apiBuilder: apiBuilder };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

export function register(
  apiRoot: ByProjectKeyRequestBuilder,
  customerDraft: MyCustomerDraft,
): Promise<AuthenticationResult> {
  return apiRoot
    .me()
    .signup()
    .post({ body: customerDraft })
    .execute()
    .then((response) => {
      if (response.statusCode === 201) {
        localStorage.removeItem('userDDS');
        const apiBuilder = createAuthorizedApiBuilder(customerDraft.email, customerDraft.password);
        apiBuilder.get().execute();
        return { success: true, apiBuilder: apiBuilder };
      } else {
        return { success: false, errorMessage: 'Error while registering user' };
      }
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

export function refreshUser(): AuthenticationResult {
  const tokenCache = new MyTokenCache();
  const tokenObj = tokenCache.get();
  if (tokenObj.refreshToken) {
    return {
      success: true,
      apiBuilder: createRefreshedAuthorizedApiBuilder(tokenObj.refreshToken),
    };
  } else {
    throw new Error('No token cache found in localStorage');
  }
}

export function logout(): AuthenticationResult {
  localStorage.removeItem('userDDS');
  return { success: true, apiBuilder: createAnonymousApiBuilder() };
}
