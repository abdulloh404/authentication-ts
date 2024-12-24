import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/database.config';

interface PersonalAccessTokenAttributes {
  id: number;
  tokenable_type: string;
  tokenable_id: number;
  name: string;
  token: string;
  abilities?: string; // JSON string ที่เก็บสิทธิ์
  last_used_at?: Date;
  expires_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface PersonalAccessTokenCreationAttributes
  extends Optional<
    PersonalAccessTokenAttributes,
    | 'id'
    | 'abilities'
    | 'last_used_at'
    | 'expires_at'
    | 'created_at'
    | 'updated_at'
  > {}

class PersonalAccessToken
  extends Model<
    PersonalAccessTokenAttributes,
    PersonalAccessTokenCreationAttributes
  >
  implements PersonalAccessTokenAttributes
{
  public id!: number;
  public tokenable_type!: string;
  public tokenable_id!: number;
  public name!: string;
  public token!: string;
  public abilities?: string;
  public last_used_at?: Date;
  public expires_at?: Date;
  public created_at?: Date;
  public updated_at?: Date;
}

// กำหนด Schema
PersonalAccessToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenable_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenable_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    abilities: {
      type: DataTypes.TEXT, // JSON string เก็บข้อมูลสิทธิ์
      allowNull: true,
    },
    last_used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
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
    tableName: 'personal_access_tokens',
    timestamps: true,
  },
);

export default PersonalAccessToken;
