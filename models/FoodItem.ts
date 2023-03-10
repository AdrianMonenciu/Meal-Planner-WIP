import { Model, Schema } from "mongoose";
import createModel from "./createModel";
import { IMeal, MealModel, mealSchema } from './Meal';
import { IUser, UserModel, userSchema } from './user';

export interface IFood {
  id: number;
  _id: Schema.Types.ObjectId;
  name: string;
  foodMeasureUnit: string;
  diet: string[];
  addedBy: Schema.Types.ObjectId;
}

interface IFoodMethods {
  fullName(): string;
}

export type FoodModel = Model<IFood, {}, IFoodMethods>;

export const foodSchema = new Schema<IFood, FoodModel, IFoodMethods>({
  id: {type: Number },
  _id: {type: Schema.Types.ObjectId, required: true, auto: true },
  name: {type: String, required:true},
  foodMeasureUnit: {type:String, required:true},
  diet: [{type: String, required:true}],
  addedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
},
{ timestamps: true },);

foodSchema.method("nameReturn", function nameReturn() {
  return this.name;
});

//createModel<IMeal, MealModel>("Meal", mealSchema)
//createModel<IUser, UserModel>("Users", userSchema)

export default createModel<IFood, FoodModel>("FoodItem", foodSchema);