var Validator = require("jsonschema").Validator;
var v = new Validator();

const optionsSchema = {
  id: "/Options",
  type: "object",
  properties: {
    lookup: {
      type: "array",
      items: { type: "string" }
    },
    notifications: {
      type: { $ref: "/Notifications" }
    },
    goals: {
      $ref: "/Limit"
    }
  }
};

const urlSchema = {
  id: "/URL",
  type: "object",
  properties: {
    url: { type: "string" },
    options: { $ref: "/Options" }
  }
};

const goalItemSchema = {
  id: "/GoalItem",
  type: "object",
  properties: {
    name: { type: "string" },
    value: { type: "number" }
  }
};

const goalSchema = {
  id: "/Goal",
  type: "object",
  properties: {
    categories: {
      type: "array",
      items: { $ref: "/GoalItem" }
    },
    audit: {
      type: "array",
      items: { $ref: "/GoalItem" }
    }
  }
};

const notificationsSchema = {
  id: "/Notifications",
  type: "object",
  properties: {
    when: {
      type: "string",
      enum: ["always", "never", "success", "fail"]
    },
    email: { type: "string" }
  }
};

const mainSchema = {
  id: "/Main",
  type: "object",
  properties: {
    task: { type: "string" },
    project: { type: "string" },
    urls: {
      type: "array",
      items: { $ref: "/URL" }
    },
    options: { $ref: "/Options" }
  }
};

v.addSchema(optionsSchema, "/Options");
v.addSchema(urlSchema, "/URL");
v.addSchema(goalItemSchema, "/GoalItem");
v.addSchema(goalSchema, "/Goal");
v.addSchema(notificationsSchema, "/Notifications");
v.addSchema(mainSchema, "/Main");

const validateConfig = config => {
  const result = v.validate(config, mainSchema);
  console.log(result.errors);
  if (result.errors.length > 0) {
    return result.errors;
  }
  return true;
};

module.exports = {
  validateConfig
};