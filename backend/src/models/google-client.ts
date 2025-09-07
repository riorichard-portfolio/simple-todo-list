import { OAuth2Client } from "google-auth-library";
import { env } from "../environment/environment";

const googleOauthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export default googleOauthClient