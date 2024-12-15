import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.config';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: 'line' | 'facebook' | 'gmail' | 'google' | null;
  isVerify: number;
  password: string;
  role: 'user' | 'admin';
  loginBy: 'regular' | 'facebook' | 'line' | 'google';
  lineId: string | null;
  facebookId: string | null;
  googleId: string | null;
  rememberToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'emailVerifiedAt'
    | 'lineId'
    | 'facebookId'
    | 'googleId'
    | 'rememberToken'
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public emailVerifiedAt!: 'line' | 'facebook' | 'gmail' | 'google' | null;
  public isVerify!: number;
  public password!: string;
  public role!: 'user' | 'admin';
  public loginBy!: 'regular' | 'facebook' | 'line' | 'google';
  public lineId!: string | null;
  public facebookId!: string | null;
  public googleId!: string | null;
  public rememberToken!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    },
    lastName: {
      type: DataTypes.CHAR(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    emailVerifiedAt: {
      type: DataTypes.ENUM('line', 'facebook', 'gmail', 'google'),
      allowNull: true,
    },
    isVerify: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'false',
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    loginBy: {
      type: DataTypes.ENUM('regular', 'facebook', 'line', 'google'),
      allowNull: false,
      defaultValue: 'regular',
    },
    lineId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rememberToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export { User };
