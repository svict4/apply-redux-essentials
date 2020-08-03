export const metadata = {
  issuer: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}`,
  jwks_uri:
    `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}` +
    "/.well-known/openid-configuration/jwks",
  authorization_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/authorize`,
  token_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/token`,
  userinfo_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/userinfo`,
  end_session_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/endsession`,
  check_session_iframe: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/checksession`,
  revocation_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/revocation`,
  introspection_endpoint: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}/connect/introspect`,
};

const configuration = {
  isEnabled: process.env.REACT_APP_AUTH_ENABLED,
  origin: "http://localhost:3000",
  config: {
    client_id: `${process.env.REACT_APP_API_AUTH_CLIENT}`,
    redirect_uri: `${process.env.REACT_APP_FRONTEND_DOMAIN}/authentication/callback`,
    response_type: "code",
    post_logout_redirect_uri: `${process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI}`,
    scope:
      "profile acrrm.profile email openid acrrm.onboarding.api.readonly acrrm.onboarding.api.fullaccess",
    authority: `${process.env.REACT_APP_IDENTITY_SERVER_DOMAIN}`,
    silent_redirect_uri: `${process.env.REACT_APP_FRONTEND_DOMAIN}/authentication/silent_callback`,
    automaticSilentRenew: true,
    loadUserInfo: true,
    triggerAuthFlow: true,
    metadata: {
      ...metadata,
    },
  },
};

export default configuration;
