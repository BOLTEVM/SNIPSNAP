import { createThirdwebClient } from "thirdweb";

// Replace with your own client id from thirdweb.com/create-app
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "a2d34bc123dd0a084d9d46b0a4ed38ab";

export const client = createThirdwebClient({
    clientId: clientId,
});
