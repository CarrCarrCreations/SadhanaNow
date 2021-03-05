/**
 * @function User
 * @description Class to create a User object
 */
class User {
  /**
   * @param {Object} userInfo Information about the user
   * @param {string} userInfo._id
   * @param {string} userInfo.displayName
   * @param {string} userInfo.email
   * @param {boolean} userInfo.isAdmin
   * @param {string} userInfo.token
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

export default User;
