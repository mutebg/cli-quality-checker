const Audit = require("lighthouse").Audit;
const validator = require("html-validator");

class StructuredAudit extends Audit {
  static get meta() {
    return {
      name: "structureddata-audit",
      description: "Check document for structured data",
      failureDescription: "",
      helpText: "...TODO...",
      requiredArtifacts: ["Structuredata"]
    };
  }

  static audit(artifacts) {
    const data = artifacts.Structuredata;

    const messages = data.errors.map(({ errorType, args }) => ({
      errorType,
      args: args.join(",")
    }));

    const headings = [
      { key: "errorType", itemType: "text", text: "Error" },
      { key: "args", itemType: "text", text: "Message" }
    ];
    const details = Audit.makeTableDetails(headings, messages);

    return {
      rawValue: messages.length === 0,
      score: messages.length === 0,
      details
    };
  }
}

module.exports = StructuredAudit;