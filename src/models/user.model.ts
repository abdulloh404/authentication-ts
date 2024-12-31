import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/database.config';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: 'line' | 'facebook' | 'gmail' | 'google';
  isVerify: number;
  password: string;
  role: 'user' | 'admin';
  loginBy: 'regular' | 'facebook' | 'line' | 'google';
  rememberToken?: string | null;
  lineId?: string;
  facebookId?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'emailVerifiedAt'
  | 'lineId'
  | 'facebookId'
  | 'googleId'
  | 'createdAt'
  | 'updatedAt'
  | 'rememberToken'
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public emailVerifiedAt?: 'line' | 'facebook' | 'gmail' | 'google';
  public isVerify!: number;
  public password!: string;
  public role!: 'user' | 'admin';
  public loginBy!: 'regular' | 'facebook' | 'line' | 'google';
  public rememberToken?: string | null;
  public lineId?: string;
  public facebookId?: string;
  public googleId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING(164),
      allowNull: false,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.ENUM('line', 'facebook', 'gmail', 'google'),
      allowNull: true,
      field: 'email_verified_at',
    },
    isVerify: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'is_verify',
    },
    password: {
      type: DataTypes.STRING(132),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    rememberToken: {
      type: DataTypes.STRING(132),
      allowNull: true,
      field: 'remember_token',
    },
    loginBy: {
      type: DataTypes.ENUM('regular', 'facebook', 'line', 'google'),
      allowNull: false,
      defaultValue: 'regular',
      field: 'login_by',
    },
    lineId: {
      type: DataTypes.STRING(132),
      allowNull: true,
      field: 'line_id',
    },
    facebookId: {
      type: DataTypes.STRING(132),
      allowNull: true,
      field: 'facebook_id',
    },
    googleId: {
      type: DataTypes.STRING(132),
      allowNull: true,
      field: 'google_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);

export default User;
