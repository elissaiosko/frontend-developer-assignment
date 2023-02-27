import React from "react";


import RecipientsEmailAddresses from "./components/RecipientsEmailAddresses";
import { EmailAddresses } from "./types";

//@ts-ignore
import emailAddresses from './assets/recipientsData.json'


const App = () => (
    <RecipientsEmailAddresses
      emailAddresses={emailAddresses as EmailAddresses}
    />
);

export default App;
