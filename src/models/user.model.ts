import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/database.config';

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: 'line' | 'facebook' | 'gmail' | 'google';
  is_verify: number;
  password: string;
  role: 'user' | 'admin';
  login_by: 'regular' | 'facebook' | 'line' | 'google';
  remember_token?: string | null;
  line_id?: string;
  facebook_id?: string;
  google_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'email_verified_at'
  | 'line_id'
  | 'facebook_id'
  | 'google_id'
  | 'created_at'
  | 'updated_at'
  | 'remember_token'
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public email_verified_at?: 'line' | 'facebook' | 'gmail' | 'google';
  public is_verify!: number;
  public password!: string;
  public role!: 'user' | 'admin';
  public login_by!: 'regular' | 'facebook' | 'line' | 'google';
  public line_id?: string;
  public facebook_id?: string;
  public google_id?: string;
  public created_at?: Date;
  public updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.CHAR(40),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.CHAR(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(164),
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.ENUM('line', 'facebook', 'gmail', 'google'),
      allowNull: true,
    },
    is_verify: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    remember_token: {
      type: DataTypes.STRING(132),
      allowNull: true,
    },
    login_by: {
      type: DataTypes.ENUM('regular', 'facebook', 'line', 'google'),
      allowNull: false,
      defaultValue: 'regular',
    },
    line_id: {
      type: DataTypes.STRING(132),
      allowNull: true,
    },
    facebook_id: {
      type: DataTypes.STRING(132),
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING(132),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
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
