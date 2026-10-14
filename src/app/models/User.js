//SEMPRE TENHA CERTEZA
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

export function initUser(sequelize) {
  if (User.sequelize) {
    return User;
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      underscored: true,
    }
  );

  return User;
}

export default User;
