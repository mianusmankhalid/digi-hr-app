import moment from 'moment';

export default class AuthInfo {
  // Auth Info must be supplied as a result of the API
  // It must contain these elements
  // auth = {
  //   access_token: '',
  //   token_type: '',
  //   expires_in: '',
  //   created_at: ''
  // }
  // -------------------------------------------------
  // If the result if not coming from the api rather
  // storage, supply alreadyPrepared as true
  constructor(authInfo, alreadyPrepared = false) {
    this.access_token = authInfo.access_token;
    this.token_type = authInfo.token_type;
    this.expires_in = authInfo.expires_in;
    if (!alreadyPrepared) this.created_at = moment();
    else this.created_at = authInfo.created_at;
  }

  get AccessToken() {
    return this.access_token;
  }

  get TokenType() {
    return this.token_type;
  }

  get ExpiresIn() {
    return this.expires_in;
  }

  get CreatedAt() {
    this.created_at;
  }

  get IsTokenExpired() {
    var now = moment();
    var created = moment(this.created_at);

    var duration = moment.duration(now.diff(created));
    var seconds = duration.asSeconds();

    return seconds > Number(this.expires_in);
  }

  toJSON() {
    return {
      access_token: this.AccessToken,
      token_type: this.TokenType,
      expires_in: this.ExpiresIn,
      created_at: this.CreatedAt,
    };
  }
}
