import mapKeys from "lodash/mapKeys";
import groupBy from "lodash/groupBy";
import { EmailAddresses, EmailAddressesGrouped } from "../../../types";

export const getHostName = (email: any) => {
  const [, host] = email.split("@");
  return host;
};

const groupEmails = (
  availableEmails: EmailAddresses
): EmailAddressesGrouped => {
  const availableEmailsGrouped = groupBy(availableEmails, (availableEmail) =>
    getHostName(availableEmail.email)
  );

  return mapKeys(availableEmailsGrouped, (value: any, key: any) => {
    const isSingleEmail = value.length === 1;
    return isSingleEmail ? value[0].email : key;
  });
};

export default groupEmails;
