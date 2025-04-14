
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  description: 'description',
  stars: 'stars'
};

exports.Prisma.AfterQuestionInformationScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  questionNumber: 'questionNumber',
  images: 'images',
  texts: 'texts'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  content: 'content',
  likes: 'likes',
  dislikes: 'dislikes',
  parentId: 'parentId'
};

exports.Prisma.EmailVerificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  otp: 'otp',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  question: 'question',
  media: 'media'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  hashedToken: 'hashedToken',
  userId: 'userId',
  revoked: 'revoked',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  expireAt: 'expireAt'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  regionName: 'regionName',
  regionCode: 'regionCode',
  mediaUrl: 'mediaUrl',
  description: 'description'
};

exports.Prisma.TagsScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  username: 'username',
  email: 'email',
  password: 'password',
  avatarUrl: 'avatarUrl',
  dateOfBirth: 'dateOfBirth',
  location: 'location',
  gender: 'gender',
  isVerified: 'isVerified'
};

exports.Prisma.Comment_reactionScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  comment_id: 'comment_id',
  reaction_type: 'reaction_type',
  created_at: 'created_at'
};

exports.Prisma.Game_typeScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name'
};

exports.Prisma.Password_resetsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt'
};

exports.Prisma.Puzzle_gameScalarFieldEnum = {
  id: 'id',
  regionid: 'regionid',
  gametype: 'gametype',
  imageurl: 'imageurl'
};

exports.Prisma.Puzzle_piecesScalarFieldEnum = {
  id: 'id',
  puzzleid: 'puzzleid',
  piece_index: 'piece_index',
  x_position: 'x_position',
  y_position: 'y_position',
  correct_x: 'correct_x',
  correct_y: 'correct_y',
  image_piece_url: 'image_piece_url'
};

exports.Prisma.Quiz_gameScalarFieldEnum = {
  id: 'id',
  regionid: 'regionid',
  gametype: 'gametype',
  title: 'title',
  description: 'description'
};

exports.Prisma.Quiz_game_qaScalarFieldEnum = {
  id: 'id',
  quiz_game_id: 'quiz_game_id',
  question: 'question',
  wrong_answers: 'wrong_answers',
  correct_answer: 'correct_answer'
};

exports.Prisma.Treasure_connection_cardsScalarFieldEnum = {
  id: 'id',
  treasure_game_id: 'treasure_game_id',
  card_type: 'card_type',
  card_value: 'card_value',
  image_url: 'image_url',
  pair_id: 'pair_id',
  position: 'position'
};

exports.Prisma.Treasure_gameScalarFieldEnum = {
  id: 'id',
  regionid: 'regionid',
  gametype: 'gametype',
  title: 'title',
  description: 'description'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.reaction_type_enum = exports.$Enums.reaction_type_enum = {
  Like: 'Like',
  Dislike: 'Dislike'
};

exports.game_code_enum = exports.$Enums.game_code_enum = {
  puzzle: 'puzzle',
  quiz: 'quiz',
  word: 'word',
  treasure: 'treasure'
};

exports.card_type_enum = exports.$Enums.card_type_enum = {
  text: 'text',
  image: 'image'
};

exports.Prisma.ModelName = {
  Achievement: 'Achievement',
  AfterQuestionInformation: 'AfterQuestionInformation',
  Comment: 'Comment',
  EmailVerification: 'EmailVerification',
  Post: 'Post',
  RefreshToken: 'RefreshToken',
  Region: 'Region',
  Tags: 'Tags',
  User: 'User',
  comment_reaction: 'comment_reaction',
  game_type: 'game_type',
  password_resets: 'password_resets',
  puzzle_game: 'puzzle_game',
  puzzle_pieces: 'puzzle_pieces',
  quiz_game: 'quiz_game',
  quiz_game_qa: 'quiz_game_qa',
  treasure_connection_cards: 'treasure_connection_cards',
  treasure_game: 'treasure_game'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
