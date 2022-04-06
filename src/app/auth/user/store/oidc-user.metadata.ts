import { User } from "oidc-client"

function OidcUserSelectId(user: User) { return user.id_token }

export const oidceUserMetadata = {
  OidcUser: {
    selectId: OidcUserSelectId
  }
}
