import { Ingridient } from "../shared/ingridient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingridients: Ingridient[];

  constructor(name: string, desc: string, imgPath: string, ingridients: Ingridient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imgPath;
    this.ingridients = ingridients;
  }
}