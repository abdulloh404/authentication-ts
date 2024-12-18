import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@environment/environment'; // สมมติว่าคุณตั้งค่า Sequelize ไว้ใน `config/database.ts`

// กำหนดประเภทของ Attributes สำหรับ Users
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
  lineId?: string;
  facebookId?: string;
  googleId?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// กำหนด Optional Attributes (Attributes ที่อาจไม่มี)
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'emailVerifiedAt'
    | 'lineId'
    | 'facebookId'
    | 'googleId'
    | 'accessToken'
    | 'refreshToken'
    | 'tokenExpiry'
    | 'createdAt'
    | 'updatedAt'
  > {}

// สร้าง Model
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
  public lineId?: string;
  public facebookId?: string;
  public googleId?: string;
  public accessToken?: string;
  public refreshToken?: string;
  public tokenExpiry?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

// กำหนด Schema
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
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tokenExpiry: {
      type: DataTypes.DATE,
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
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);

export default User;
