import type {
    InferAttributes,
    InferCreationAttributes,
    Sequelize,
} from 'sequelize';

import { DataTypes, Model } from 'sequelize';

class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
> {
    declare name: string;
}

export function initCategory(sequelize: Sequelize): typeof Category {
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'category',
            underscored: true,
        }
    );

    return Category;
}

export default Category;
