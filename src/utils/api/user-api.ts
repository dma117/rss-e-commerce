import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { login, logout } from './commercetools-api';

interface Response {
  success: boolean;
  errorMessage?: string;
  email?: string;
  apiRoot?: ByProjectKeyRequestBuilder;
}

export function updatePersonalInfo(
  apiRoot: ByProjectKeyRequestBuilder,
  newFirstName: string,
  newLastName: string,
  newDateOfBirth: string,
  newEmail: string,
): Promise<Response> {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const customerVersion = response.body.version;

      return apiRoot
        .me()
        .post({
          body: {
            version: customerVersion,
            actions: [
              { action: 'setFirstName', firstName: newFirstName },
              { action: 'setLastName', lastName: newLastName },
              { action: 'changeEmail', email: newEmail },
              { action: 'setDateOfBirth', dateOfBirth: newDateOfBirth },
            ],
          },
        })
        .execute();
    })
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}

export async function changePassword(
  apiRoot: ByProjectKeyRequestBuilder,
  currentPassword: string,
  newPassword: string,
): Promise<Response> {
  return apiRoot
    .me()
    .get()
    .execute()
    .then((response) => {
      const customerVersion = response.body.version;
      console.log(response.body);
      return apiRoot
        .me()
        .password()
        .post({
          body: {
            currentPassword: currentPassword,
            newPassword: newPassword,
            version: customerVersion,
          },
        })
        .execute();
    })
    .then(async (response) => {
      const logoutResponse = logout();

      if (logoutResponse.success && logoutResponse.apiBuilder) {
        const loginResponse = await login(
          logoutResponse.apiBuilder,
          response.body.email,
          newPassword,
        );

        if (loginResponse.success && loginResponse.apiBuilder) {
          return { success: true, email: response.body.email, apiRoot: loginResponse.apiBuilder };
        } else if (loginResponse.errorMessage) {
          return { success: false, errorMessage: loginResponse.errorMessage };
        }
      }
      return { success: true, email: response.body.email };
    })
    .catch((error) => {
      return { success: false, errorMessage: error.message };
    });
}
