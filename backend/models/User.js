/**
 * @typedef {Object} UserInfo
 * @property {string} _id
 * @property {string} displayName
 * @property {string} email
 * @property {boolean} isAdmin
 * @property {string} token
 */

/**
 * Class to create a User object
 */
class User {
  /**
   * @param {UserInfo} userInfo Information about the user
   */
  constructor(userInfo) {
    /**
     * @property {string} _id
     * @description Database ID
     */
    this._id = userInfo._id;

    /**
     * @property {string} displayName
     */
    this.displayName = userInfo.displayName;

    /**
     * @property {string} email
     */
    this.email = userInfo.email;

    /**
     * @property {boolean} isAdmin
     */
    this.isAdmin = userInfo.isAdmin;

    /**
     * @property {string} token
     */
    this.token = userInfo.token;
  }
}
