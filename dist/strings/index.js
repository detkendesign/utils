"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = void 0;
/** Gets the singular or plural version of a word based on its count. */
function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural || singular + "s";
}
exports.pluralize = pluralize;
