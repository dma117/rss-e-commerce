import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

interface Response {
  success: boolean;
  errorMessage?: string;
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
