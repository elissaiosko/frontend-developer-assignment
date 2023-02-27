import groupEmails, { getHostName } from "./groupEmails";

describe("getHostName function", () => {
  const testData = [
    ["brian@qwerty.com", "qwerty.com"],
    ["jane@awesome.com", "awesome.com"],
    ["bo@awesome.com", "awesome.com"],
  ];

  it.each(testData)("For input %p should return %p", (email, hostname) => {
    expect(getHostName(email)).toEqual(hostname);
  });
});

describe("groupEmails function", () => {
  it("should convert emails to group emails", () => {
    const emails = [
      {
        email: "ann@timescale.com",
      },
      {
        email: "bob@timescale.com",
      },
      {
        email: "brian@qwerty.com",
      },
      {
        email: "george@qwerty.com",
      },
      {
        email: "kostas@gmail.com",
      },
      {
        email: "antonis@in.com",
      },
    ];

    const expectedResult = {
      "timescale.com": [
        {
          email: "ann@timescale.com",
        },
        {
          email: "bob@timescale.com",
        },
      ],
      "qwerty.com": [
        {
          email: "brian@qwerty.com",
        },
        {
          email: "george@qwerty.com",
        },
      ],
      "kostas@gmail.com": [
        {
          email: "kostas@gmail.com",
        },
      ],
      "antonis@in.com": [
        {
          email: "antonis@in.com",
        },
      ],
    };

    expect(groupEmails(emails)).toEqual(expectedResult);
  });
});
