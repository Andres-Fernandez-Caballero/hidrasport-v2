import { MenuItem } from "primereact/menuitem";

export interface ILink extends MenuItem {
  label: string;
  url: string;
  items?: ILink[];
}

export interface LinkImage extends ILink {
  image: string;
}