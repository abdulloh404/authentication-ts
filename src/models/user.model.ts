import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/database.config';

// Define the attributes for the User model
export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: 'line' | 'facebook' | 'gmail' | 'google';
  password: string;
  role: 'user' | 'admin';
  loginBy: 'regular' | 'facebook' | 'line' | 'google';
  rememberToken?: string | null;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for model creation
type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'emailVerifiedAt'
  | 'rememberToken'
  | 'googleId'
  | 'createdAt'
  | 'updatedAt'
>;

// Define the User class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public emailVerifiedAt?: 'line' | 'facebook' | 'gmail' | 'google';
  public password!: string;
  public role!: 'user' | 'admin';
  public loginBy!: 'regular' | 'facebook' | 'line' | 'google';
  public rememberToken?: string | null;
  public googleId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  // Add any instance-level methods here (e.g., helper functions)
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.CHAR(48),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.CHAR(48),
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
    password: {
      type: DataTypes.STRING(164),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    rememberToken: {
      type: DataTypes.STRING(164),
      allowNull: true,
      field: 'remember_token',
    },
    loginBy: {
      type: DataTypes.ENUM('regular', 'facebook', 'line', 'google'),
      allowNull: false,
      defaultValue: 'regular',
      field: 'login_by',
    },
    googleId: {
      type: DataTypes.STRING(164),
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
    underscored: true,
  },
);

export default User;
